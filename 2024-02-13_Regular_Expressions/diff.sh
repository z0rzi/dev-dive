#!/bin/bash

# Taken from https://unix.stackexchange.com/questions/11128/diff-within-a-line

if [ $# -nt 2 ]; then
    echo "Usage: $0 file1 file2"
    exit 1
fi

file1=$1
file2=$2

if [ ! -f $file1 ]; then
    echo "File $file1 does not exist"
    exit 2
fi

if [ ! -f $file2 ]; then
    echo "File $file2 does not exist"
    exit 3
fi

same='-' #unchanged
up='△' #exists in first line, but not in second 
down='▽' #exists in second line, but not in first
reset=''

reset=$'\e[0m'
same=$reset
up=$reset$'\e[1m\e[7m'
down=$reset$'\e[1m\e[7m\e[31m'

timeout=1


if [[ "$1" != '' ]]
then
    paste -d'\n' "$file1" "$file2" | "$0"
    exit
fi

# Change \x20 to \x02 to simplify parsing diff's output,
#+   then change \x02 back to \x20 for the final output. 
# Change \x09 to \x01 to simplify parsing diff's output, 
#+   then change \x01 into → U+1F143 (Squared Latin Capital Letter T)
function input {
    sed \
        -e "s/\x09/\x01/g" \
        -e "s/\x20/\x02/g" \
        -e "s/\(.\)/\1\n/g"
}
function output {
    sed -n \
        -e "s/\x01/→/g" \
        -e "s/\x02/ /g" \
        -e "s/^\(.\) *\x3C$/\1 \x3C  /g" \
        -e "s/\(.\) *\(.\) \(.\)$/\1\2\3/p"
}

ifs="$IFS"
IFS=$'\n'

while IFS= read -t "$timeout" -r a
do
    IFS= read -t "$timeout" -r b
    if [[ $? -ne 0 ]]
    then
        echo 'No corresponding line to compare with' > /dev/stderr
        exit 1
    fi

    diff --text -yt -W 19  \
        <(echo "$a" | input) \
        <(echo "$b" | input) \
    | \
    output | \
    {
        type=''
        buf=''
        while read -r line
        do
            if [[ "${line:1:1}" != "$type" ]]
            then
                if [[ "$type" = '|' ]]
                then
                    type='>'
                    echo -n "$down$buf"
                    buf=''
                fi

                if [[ "${line:1:1}" != "$type" ]]
                then
                    type="${line:1:1}"

                    echo -n "$type" \
                        | sed \
                            -e "s/[<|]/$up/" \
                            -e "s/>/$down/" \
                            -e "s/ /$same/"
                fi
            fi

            case "$type" in
            '|')
                buf="$buf${line:2:1}"
                echo -n "${line:0:1}"
                ;;
            '>')
                echo -n "${line:2:1}"
                ;;
            *)
                echo -n "${line:0:1}"
                ;;
            esac
        done

        if [[ "$type" = '|' ]]
        then
            echo -n "$down$buf"
        fi
    }

    echo -e "$reset"
done

IFS="$ifs"

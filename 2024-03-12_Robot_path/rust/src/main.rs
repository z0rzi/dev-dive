use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        println!("Please provide a sequence as a command-line argument");
        return;
    }

    let sequence = &args[1];

    println!("{}", sequence);

    let mut x = 0;
    let mut y = 0;

    for _ in 0..1000 {
        println!("Robot is moving randomly");
        let xory = if rand::random::<bool>() { "x" } else { "y" };
        if xory == "x" {
            x += if rand::random::<bool>() { 1 } else { -1 };
        } else {
            y += if rand::random::<bool>() { 1 } else { -1 };
        }
        println!("> {};{}", x, y);
    }
}

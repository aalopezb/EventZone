pub fn sanitize_input(input: &str) -> String {
    input.trim().replace("\"", "'")
}

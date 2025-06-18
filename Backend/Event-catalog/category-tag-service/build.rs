fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::compile_protos("proto/category_tag.proto")?;
    Ok(())
}

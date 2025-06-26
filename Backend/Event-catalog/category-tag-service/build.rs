fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::compile_protos("proto/category_tag.proto")?;
    println!("cargo:rerun-if-changed=proto/category_tag.proto");
    Ok(())
}

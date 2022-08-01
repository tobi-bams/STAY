const Blockfrost = require("@blockfrost/blockfrost-js");
const fs = require("fs");

export async function runExample(name: string, object: any) {
  const IPFS = new Blockfrost.BlockFrostIPFS({
    projectId: process.env.IPFS, // see: https://blockfrost.io
  });

  try {
    fs.writeFileSync(`${name}.json`, JSON.stringify(object));
    let all = await IPFS.add(`${name}.json`);
    console.log(all);
    fs.unlinkSync(`${name}.json`);
    return { status: true, data: all };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
}

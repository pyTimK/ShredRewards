import { TripleDES, enc, mode, lib, pad } from "crypto-js";

import { debugMode, symmetric_key } from "../classes/Constants";
import { allDigit } from "./utils";
import ParsedQR from "../classes/ParsedQR";
const key = enc.Hex.parse(symmetric_key);

const qr_decoder = (base64String: string | string[] | undefined) => {
  if (typeof base64String !== "string") {
    if (debugMode)
      console.log(`typeof base64String{${base64String}} !== "string"`);
    throw Error("Invalid_qr");
  }

  // To hex string
  const buffer = Buffer.from(base64String, "base64");
  const hexString = buffer.toString("hex");

  // To plain text - "kors-0004-000319"
  let plainText = "";
  for (let i = 0; i < 2; i++) {
    const hexStringPart = hexString.substring(0 + 16 * i, 16 + 16 * i);
    const cipherText = enc.Hex.parse(hexStringPart);
    const cipherParams = lib.CipherParams.create({
      ciphertext: cipherText,
    });
    const decrypted = TripleDES.decrypt(cipherParams, key, {
      mode: mode.ECB,
      padding: pad.ZeroPadding,
    });
    plainText += decrypted.toString(enc.Utf8);
  }

  // Check validity
  if (plainText.length !== 16) {
    if (debugMode) console.log(`plainText{${plainText}} decoded length !== 16`);
    throw new Error("Invalid_qr");
  }
  if (plainText.substring(0, 4) !== "kors") {
    if (debugMode)
      console.log(
        `plainText.substring(0, 4){${plainText.substring(0, 4)}} !== "kors"`
      );
    throw new Error("Invalid_qr");
  }

  // Get output strings
  const keyCounterStr = plainText.substring(5, 9);
  const weightStr = plainText.substring(10, 16);

  // Check validity
  if (!allDigit(keyCounterStr) || !allDigit(weightStr)) {
    if (debugMode)
      console.log(
        `!allDigit(keyCounterStr){${keyCounterStr}} || !allDigit(weightStr){${weightStr}}`
      );
    throw new Error("Invalid_qr");
  }
  const keyCounter = parseInt(keyCounterStr);
  const weight = parseInt(weightStr);

  return new ParsedQR(keyCounter, weight);
};

export default qr_decoder;

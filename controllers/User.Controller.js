const bcrypt = require("bcrypt");
const {
  getUser,
  createUserM,
  getDataLimitFromTable,
} = require("../models/User.Model");
const { encrypt, decrypt } = require("../utils/Encrypt");
const { generateTokenUser } = require("../utils/Token");


const getUserC = async (req, callback) => {
  // with callback function
  // getUser( (e) => {
  //     callback(200, e)
  // })
  const x = await getUser();
  return { code: 200, data: x };
};

const createUser = async (data) => {
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  
  const paramData = { email: data.email };
  const userEncrypt = encrypt(paramData.email)
  paramData.email = userEncrypt.encryptedData
  const tokenu = await generateTokenUser(paramData);
  const valtoken = {token: tokenu};

  //const insert = await createUserM(data)

  //console.log(tokenu)
  return createUserM(data)
    .then((e) => {
      return { code: 200, data: "success inserted" };
    })
    .catch((err) => {
      return { code: 200, data: valtoken };
    });
};

const authUser = async (data) => {
  try {
    const paramData = { email: data.email };
    if (data.email == null || "" || undefined)
      return { code: 400, data: "All input is required" };

    const dataUser = await getDataLimitFromTable(paramData, "t_users", 1);
    //console.log(paramData)

    if (
      dataUser &&
      (await bcrypt.compare(data.password, dataUser[0].password))
    ) {
      const userEncrypt = encrypt(paramData.email)
      paramData.email = userEncrypt.encryptedData
      const tokenUser = await generateTokenUser(paramData);
      return { code: 200, data: tokenUser };
    }

    return { code: 400, data: "Invalid Credentials" };
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUserC, createUser, authUser };

// const key = process.env.REACT_APP_PINATA_KEY;
// const secret = process.env.REACT_APP_PINATA_SECRET;

const key = "1b94c50eeb3504de1b13";
const secret = "c4477d7e7c5abe5f417e6bdef010f3f43d283e4258bffa00cfdd47c1f9b441aa";
const axios = require('axios');
const FormData = require('form-data');

const pinataBaseURL = 'https://api.pinata.cloud/pinning';

// Add this function to handle CORS
const configureCorsHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    };
};

export const uploadJSONToIPFS = async (JSONBody) => {
    const url = `${pinataBaseURL}/pinJSONToIPFS`;

    return axios
        .post(url, JSONBody, {
            headers: {
                ...configureCorsHeaders(),
                'pinata_api_key': key,
                'pinata_secret_api_key': secret,
            },
        })
        .then(function (response) {
            return {
                success: true,
                pinataURL: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
            };
        })
        .catch(function (error) {
            console.log(error);
            return {
                success: false,
                message: error.message,
            };
        });
};

export const uploadFileToIPFS = async (file) => {
    const url = `${pinataBaseURL}/pinFileToIPFS`;

    let data = new FormData();
    data.append('file', file,{filepath: "anyname"});

    // Rest of your code...
    console.log(key);
    console.log(secret);
    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                ...configureCorsHeaders(),
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'pinata_api_key': key,
                'pinata_secret_api_key': secret,
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash);
            return {
                success: true,
                pinataURL: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
            };
        })
        .catch(function (error) {
            console.log(error);
            return {
                success: false,
                message: error.message,
            };
        });
};

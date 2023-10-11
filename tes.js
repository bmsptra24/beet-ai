const axios = require('axios').default

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDI2MTgwNWMtODIwZS00ZGZhLWIwZGEtOGU1NmMzMTE0YzU1IiwidHlwZSI6ImFwaV90b2tlbiJ9.BAeyU5sbAyldtT17SlupGy1_Vmy1PHCiDPHcPDW2pAg'
const options = {
  method: 'POST',
  url: 'https://api.edenai.run/v2/audio/text_to_speech',
  headers: {
    authorization: 'Bearer ' + API_KEY,
  },
  data: {
    show_original_response: false,
    fallback_providers: '',
    providers: 'google',
    language: 'id',
    text: 'hai nama kamu siapa',
    option: 'MALE',
  },
}

axios
  .request(options)
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.error(error)
  })

import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import icon from './icon.svg'

function App() {

  const [langOptions, setLangOptions] = useState([])
  const [from, setFrom] = useState("en")
  const [to, setTo] = useState("hi")
  const [input, setInput]= useState('')
  const [output, setOutput]= useState('')

  const codeLang={
    "af": "Afrikaans",
    "ak": "Akan",
    "am": "Amharic",
    "ar": "Arabic",
    "as": "Assamese",
    "ay": "Aymara",
    "az": "Azerbaijani",
    "be": "Belarusian",
    "bg": "Bulgarian",
    "bho": "Bhojpuri",
    "bm": "Bambara",
    "bn": "Bengali",
    "bs": "Bosnian",
    "ca": "Catalan",
    "ceb": "Cebuano",
    "ckb": "Central Kurdish",
    "co": "Corsican",
    "cs": "Czech",
    "cy": "Welsh",
    "da": "Danish",
    "de": "German",
    "doi": "Dogri",
    "dv": "Divehi",
    "ee": "Ewe",
    "el": "Greek",
    "en": "English",
    "eo": "Esperanto",
    "es": "Spanish",
    "et": "Estonian",
    "eu": "Basque",
    "fa": "Persian",
    "fi": "Finnish",
    "fr": "French",
    "fy": "Western Frisian",
    "ga": "Irish",
    "gd": "Scottish Gaelic",
    "gl": "Galician",
    "gn": "Guarani",
    "gom": "Goan Konkani",
    "gu": "Gujarati",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "he": "Hebrew",
    "hi": "Hindi",
    "hmn": "Hmong",
    "hr": "Croatian",
    "ht": "Haitian Creole",
    "hu": "Hungarian",
    "hy": "Armenian",
    "id": "Indonesian",
    "ig": "Igbo",
    "ilo": "Iloko",
    "is": "Icelandic",
    "it": "Italian",
    "iw": "Hebrew",
    "ja": "Japanese",
    "jv": "Javanese",
    "jw": "Javanese",
    "ka": "Georgian",
    "kk": "Kazakh",
    "km": "Khmer",
    "kn": "Kannada",
    "ko": "Korean",
    "kri": "Krio",
    "ku": "Kurdish",
    "ky": "Kyrgyz",
    "la": "Latin",
    "lb": "Luxembourgish",
    "lg": "Ganda",
    "ln": "Lingala",
    "lo": "Lao",
    "lt": "Lithuanian",
    "lus": "Mizo",
    "lv": "Latvian",
    "mai": "Maithili",
    "mg": "Malagasy",
    "mi": "Maori",
    "mk": "Macedonian",
    "ml": "Malayalam",
    "mn": "Mongolian",
    "mni-Mtei": "Manipuri",
    "mr": "Marathi",
    "ms": "Malay",
    "mt": "Maltese",
    "my": "Burmese",
    "ne": "Nepali",
    "nl": "Dutch",
    "no": "Norwegian",
    "nso": "Northern Sotho",
    "ny": "Chichewa",
    "om": "Oromo",
    "or": "Oriya",
    "pa": "Punjabi",
    "pl": "Polish",
    "ps": "Pashto",
    "pt": "Portuguese",
    "qu": "Quechua",
    "ro": "Romanian",
    "ru": "Russian",
    "rw": "Kinyarwanda",
    "sa": "Sanskrit",
    "sd": "Sindhi",
    "si": "Sinhalese",
    "sk": "Slovak",
    "sl": "Slovenian",
    "sm": "Samoan",
    "sn": "Shona",
    "so": "Somali",
    "sq": "Albanian",
    "sr": "Serbian",
    "st": "Southern Sotho",
    "su": "Sundanese",
    "sv": "Swedish",
    "sw": "Swahili",
    "ta": "Tamil",
    "te": "Telugu",
    "tg": "Tajik",
    "th": "Thai",
    "ti": "Tigrinya",
    "tk": "Turkmen",
    "tl": "Tagalog",
    "tr": "Turkish",
    "ts": "Tsonga",
    "tt": "Tatar",
    "ug": "Uyghur",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zh": "Chinese",
    "zh-CN": "Simplified Chinese",
    "zh-TW": "Traditional Chinese",
    "zu": "Zulu"
  }

  // console.log(codeLang['sd'])
  // console.log(output)

  useEffect(()=>{
    const options = {
      method: 'GET',
      url: 'https://googlef-translate1.p.rapidapi.com/language/translate/v2/languages',
      headers: {
        // 'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '62a81008acmshf5400bb75aba83cp1c4f37jsndacd3f9798b8',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      }
    };

    axios.request(options).then( (response) =>{
      console.log(response.data.data.languages);
      setLangOptions(response.data.data.languages)
    }).catch( (error)=> {
      console.error(error);
    });

  },[])

  const translate=()=>{

    const encodedParams = new URLSearchParams();
    // (key, value) pairs
    encodedParams.append("q", input); // text u wan to convert
    encodedParams.append("source", from); // optional becoz api can autodetect
    encodedParams.append("target", to); // target language

    console.log(input,from, to)
    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '62a81008acmshf5400bb75aba83cp1c4f37jsndacd3f9798b8',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodedParams
      };

      axios.request(options).then( (response) =>{
        // console.log(response.data); 
        console.log(response.data.data.translations[0].translatedText)
        setOutput(response.data.data.translations[0].translatedText)

      }).catch( (error) =>{
        console.error(error);
    });
  }

  return (
    <div className="App">
      <div className="app-name">
        <img className='icon' src={icon} alt="" />
        GOOGLE TRANSLATE
      </div>
      <div className="header-container">
        <div className='header'>
          <div className="from options">
            From: 
            <select  onChange={(e)=> setFrom(e.target.value)}>
              <option value=""  selected>English</option>
              {
                langOptions? langOptions.map((lang)=>{
                  return <option key={ lang.language} value={ lang.language}>{codeLang[ lang.language]}</option>
                }) : null
              }
            </select>
          </div>
          
          <div className="to options">
            To:
            <select onChange={e=> setTo(e.target.value)}>
              <option value="" selected>Hindi</option>
                {
                  langOptions && langOptions.map((lang)=>{
                  return <option key={ lang.language} value={ lang.language}>{codeLang[ lang.language]}</option>
                })}
            </select>
          </div>
        </div>
      </div>

      <div className="txt-container">
        <div className="txt-inner">
          <div className='txt-area'>
            <textarea cols="0" rows="14" placeholder='Enter text...' onInput={e=> setInput(e.target.value)}></textarea>
          </div>
          <div className='txt-area'>
            <textarea cols="0" rows="14" placeholder='Translation...' value={output} readOnly></textarea>
          </div>
        </div>
        <div>
          <button className='btn' onClick={translate}>Translate</button>
        </div>
      </div>
    </div>
  );
}

export default App;

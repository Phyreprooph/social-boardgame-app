import { parseString } from "xml2js"
import { promisify } from "es6-promisify"

const BASE_URL = "https://www.boardgamegeek.com/xmlapi2"

const convertXmlJson = promisify(parseString)

const searchItem = ({ query }) =>
  fetch(`${BASE_URL}/search?query=${encodeURI(query)}`)
    .then(response => response.text())
    .then(convertXmlJson)

export { searchItem }

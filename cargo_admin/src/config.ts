// import * as env from 'env-var'

let configList: any = {
    API_BASE_URL: 'https://mybox.mn/api',
    // API_BASE_URL: 'http://localhost:8082/api',
    IMAGE_BASE_URL: 'https://mybox.mn/',
  }
  
  interface Config {
    get: (option: string) => string
    config: (data: any) => void
  }
  const config: Config = {
    get: (option: string) => {
      return configList[option]
    },
    config: (data: any) => {
      configList = {
        ...configList,
        ...data,
      }
    },
  }
  export default config
  
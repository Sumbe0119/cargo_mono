// import * as env from 'env-var'

let configList: any = {
    API_BASE_URL: 'http://localhost:8085/api/',

  // IMAGE_BASE_URL: 'http://localhost:30000',
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
  
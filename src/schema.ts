import { gql, IResolvers, makeExecutableSchema } from 'apollo-server'

const typeDefs = gql`
  type Coordinates {
    lon: Float
    lat: Float
  }

  type Weather {
    id: Int!
    main: String
    description: String
    icon: String
  }

  type WeatherTemp {
    temp: Float
    feelsLike: Float
  }

  type CountryInfo {
    country: String!
  }

  type WeatherResponse {
    id: String!
    name: String
    base: String
    coord: Coordinates
    main: WeatherTemp
    weather: [Weather]!
    dt: Int!
    sys: CountryInfo!
  }

  type weatherTemp {
    max: Float
  }

  type dailyData {
    dt: Int!
    pop: Float
    temp: weatherTemp
    weather: [Weather]!
  }

  type hourlyData {
    dt: Int!
    pop: Float
    temp: Float
    weather: [Weather]!
  }

  type DailyResponse {
    daily: [dailyData]
    hourly: [hourlyData]
  }

  type Query {
    weatherByCity(city: String!): WeatherResponse
    weatherByCoords(lat: Float!, lon: Float!): WeatherResponse
    dailyWeatherData(lat: Float!, lon: Float!): DailyResponse
  }
`

const resolvers: IResolvers = {
  Query: {
    weatherByCity(_, { city }, { dataSources }) {
      return dataSources.weatherAPI.withCity(city)
    },
    weatherByCoords(_, { lat, lon }, { dataSources }) {
      return dataSources.weatherAPI.withCoords(lat, lon);
    },
    dailyWeatherData(_, { lat, lon }, { dataSources }) {
      let data = dataSources.weatherAPI.dailyWeather(lat, lon);  
      return data
    }  
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

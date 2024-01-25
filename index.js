const parse = require('csv-parser')
const fs = require('fs')

const resulats = []

function isHabititablePoint(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6
}

fs.createReadStream("kepler_data.csv")
  .pipe(parse({ skipComments: '#', columns: true }))
  .on('data', (data) => {
    if (isHabititablePoint(data)) {
      resulats.push(data)
    }
  })
  .on('error', (error) => {
    console.log("🚀 ~ error:", error)
  })
  .on('end', () => {
    console.log(resulats.map((planet) => {
      return planet['kepler_name']
    }))
    console.log("🚀 ~ .on ~ resulats:", resulats.length)
  })
// parse()

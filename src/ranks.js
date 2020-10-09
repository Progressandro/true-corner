import browser from 'webextension-polyfill'


let uList = document.getElementById('standings')
let rankings = document.getElementById('table')


const addStat = ( row, name) => {
  let column = document.createElement('div')
  column.setAttribute('class', 'col-sm border-right')
  let stat = document.createElement('h6')
  stat.appendChild(document.createTextNode(name))
  column.append(stat)
  row.appendChild(column)
}

const arrayStats = ['ranking', 'team', 'matches', 'wins', 'losses', 'draws', 'points', 'goalsDiff']
 

const addLeague = (league) =>{
  let header = document.getElementById('league')
  let title = document.getElementById('title')
  header.appendChild(document.createTextNode(`League: ${league}`))
  title.appendChild(document.createTextNode(league))
}
const init = async () => {
  const league = (await browser.storage.local.get('liga'))['liga']
  console.log('League: ', league)
  addLeague(league)
  const table = browser.storage.local.get(league)
  table.then(data => {
    data[league].forEach(team => {
      let row = document.createElement('div')
      row.setAttribute('class', 'row')
      arrayStats.forEach(element => {
        addStat(row, team[element])
      })
      rankings.append(row)
    })
    console.log(data)
  }).catch(error => console.error(error))
}

init()
console.log('Works!')

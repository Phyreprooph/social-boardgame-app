import React, { Component } from "react"
import { searchItem } from "Lookup/api"
import { Input, List } from "semantic-ui-react"
import debounce from "lodash.debounce"
import * as R from "ramda"

import "./Lookup.css"

// const log = name => res => {
//   console.log(name, res)
//   return res
// }

const getValue = R.pipe(
  R.head,
  R.propOr({ value: "" }, "$"),
  R.prop("value")
)

const getItemsFromXML = R.pipe(
  R.propOr({}, "items"),
  R.propOr([], "item"),
  R.filter(item => R.contains("boardgame", R.path(["$", "type"], item)))
)

class Lookup extends Component {
  state = {
    isSearching: true,
    results: {},
    selectedGames: [],
  }

  handleChangeInput = debounce(query => this.search({ query }), 700, {
    maxWait: 1200,
  })

  search = ({ query }) => {
    this.setState({ isSearching: true })
    return searchItem({ query }).then(results =>
      this.setState({ results, isSearching: false })
    )
  }

  componentDidMount() {
    this.search({ query: "catan" })
  }

  render() {
    const { results, isSearching, selectedGames } = this.state
    return (
      <div className="App">
        <SearchBox
          defaultValue={"catan"}
          loading={isSearching}
          onChange={this.handleChangeInput}
        />
        <List>
          {getItemsFromXML(results).map((xmlItem, i) => {
            return R.isEmpty(xmlItem) ? (
              <List.Item>"nothing found"</List.Item>
            ) : (
              <List.Item
                key={xmlItem.$.id + i}
                onClick={() => {
                  const newSelectedGames = [
                    ...selectedGames,
                    parseInt(xmlItem.$.id, 10),
                  ]
                  return this.setState({
                    selectedGames: newSelectedGames,
                  })
                }}
              >
                <BoardGameTile
                  id={xmlItem.$.id}
                  name={getValue(xmlItem.name)}
                  year={getValue(R.propOr([], "yearpublished", xmlItem))}
                  checked={false}
                />
              </List.Item>
            )
          })}
        </List>
      </div>
    )
  }
}

const BoardGameTile = ({ id, name, year, checked }) => (
  <div className={"BoardGameTile"}>
    <div className={"BoardGameTile__name"}>{name}</div>
    <div className={"BoardGameTile__year"}>{year}</div>
    <div className={"BoardGameTile__checkcontainer"}>
      <div
        className={`BoardGameTile__check--${checked ? "checked" : "unchecked"}`}
      >
        {checked}
      </div>
    </div>
  </div>
)

const SearchBox = ({ loading, onChange, defaultValue }) => (
  <Input
    loading={loading}
    size="big"
    icon="search"
    defaultValue={defaultValue}
    placeholder="Search..."
    onChange={e => {
      e.preventDefault()
      return onChange(e.target.value)
    }}
  />
)

export { Lookup }

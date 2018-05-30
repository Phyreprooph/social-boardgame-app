import React, { Component } from "react"
import { searchUser } from "UserLookup/api"
import { Input, Card } from "semantic-ui-react"
import debounce from "lodash.debounce"
import * as R from "ramda"

import "./UserLookup.css"

const getValue = R.pipe(
  R.head,
  R.propOr({ value: "" }, "$"),
  R.prop("value")
)

class UserLookup extends Component {
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
    return searchUser({ query }).then(results =>
      this.setState({
        results: results.user.$.id === "" ? {} : results,
        isSearching: false,
      })
    )
  }

  componentDidMount() {
    this.search({ query: "catan" })
  }

  render() {
    const { results, isSearching } = this.state
    return (
      <div className="App">
        <SearchBox
          defaultValue={"catan"}
          loading={isSearching}
          onChange={this.handleChangeInput}
        />
        {R.isEmpty(results) ? (
          <div>Nothing Found</div>
        ) : (
          <Card.Group>
            <Card
              fluid
              link
              color="red"
              header={`${R.path(["user", "$", "name"], results)}`}
              meta={`${getValue(results.user.yearregistered)}`}
              description={`${getValue(results.user.firstname)} ${getValue(
                results.user.lastname
              )}`}
            />
          </Card.Group>
        )}
      </div>
    )
  }
}

const SearchBox = ({ loading, onChange, defaultValue }) => (
  <Input
    style={{ padding: "8px 0" }}
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

export { UserLookup }

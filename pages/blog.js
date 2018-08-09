// pages/blog.js
import React from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo'
import withData from '../lib/withData'
import Layout from '../components/layout'
import {Router} from '../server/router'

class Blog extends React.Component {
  handleClick () {
    // With route name and params
    Router.pushRoute('blog', {slug: 'hello-world'})
    // With route URL
    Router.pushRoute('/blog/hello-world')
  }
  render () {
   const { pathname } = this.props.url;
    console.log(this.props);
    return (
      <Layout title={pathname}>
        <div>{this.props.url.query.slug}</div>
        <button onClick={this.handleClick}>Home</button>
      </Layout>
    )
  }
}

export default withData(Blog);
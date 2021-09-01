import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "gatsby-image"
import styled from "styled-components"

const Post = styled.div`
  display: flex;
`

const ContentPublish = styled.div`
display:flex;
flex-direction:row;
`

const PostImage = styled.div`
  flex: 25%;
  margin-right: 1rem;
  border-radius:10px;
`

const PostText = styled.div`
  flex: 75%;
`

const Title = styled.span`
font-size: 28px;
text-decoration: none;
color:#508991;

:hover{
  color:#75DDDD;
}
`
const Subtitle = styled.p`
font-size: 16px;
text-decoration: none;
color:#172a3a;
`
const Publish = styled.p`
font-size: 14px;
text-decoration: none;
color:#508991;
`
const Author = styled.p`
font-size: 14px;
text-decoration: none;
color:#004346;
`


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title  
  const posts = data.allContentfulPost.edges
  

  if (posts.length === 0) {
    return (
      
      <Layout location={location} title={siteTitle}>
        <Seo title="Games Blog" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (

    <Layout location={location} title={siteTitle}>
      <Seo title="Games Blog" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.node.title || post.node.slug
          const subtitle = post.node.subtitle || post.node.slug
          const author = post.node.author || post.node.slug
          const image = post.node.imagen.fluid || post.node.slug
          

          return (
            <Post key={post.node.slug}>
              <PostImage>
                  <Img fluid={image} style={{borderRadius:"10px"}}></Img>
              </PostImage>
              <PostText>
                <header>
                  
                  <Link to={post.node.slug} itemProp="url" style={{borderRadius:"10px"}}>
                      <Title itemProp="headline">{title}</Title>
                  </Link>
                  
                </header>
                <section>
                  <Subtitle>{subtitle}</Subtitle>
                </section>
                <section>
                  <ContentPublish>
                    <Publish>Published 4 hours ago, by: </Publish><Author>{author}</Author>
                  </ContentPublish>
                </section>
              </PostText>
            </Post>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost{
      edges{
        node{
          title
          subtitle
          description{
            description
          }
          author
          slug
          imagen{
            fluid{
              ...GatsbyContentfulFluid
            }     
          }
        }
      }
    }
  }
`

import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "gatsby-image"
import styled from "styled-components"

const Title = styled.span`
font-size: 40px;
text-decoration: none;
color:#508991;
}
`
const Texto = styled.span`
font-size: 18px;
text-decoration: none;
color:#004346;

font-size: 14px;
text-decoration: none;

}
`
const BlogPostContenfulTemplate = ({ data, location }) => {
  const post = data.contentfulPost
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = data
  return (
    
    <Layout location={location} title={siteTitle}>
      <Seo title={post.title}    />
      <Title>{post.title}</Title>
      <Img fluid={post.imagen.fluid} style={{borderRadius:"10px"}}/>    
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <hr></hr>
        <header>
          <Texto>{post.description.description}</Texto>
          
        </header>

        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostContenfulTemplate

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug(
    $slug: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(slug:{eq:$slug}){
      title
      author
      description{
        description
      }
      imagen{
        fluid{
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import ReactImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import Section from 'components/Section';

interface ImageData {
  allFile: {
    edges: {
      node: {
        childImageSharp: {
          fluid: {
            src: string;
          };
          fixed: {
            src: string;
          };
        };
      };
    }[];
  };
}

function Gallery() {
  const data: ImageData = useStaticQuery(graphql`
    {
      allFile(filter: { relativeDirectory: { eq: "gallery" } }) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
              fixed(width: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);

  console.log(data);

  const images: ReactImageGalleryItem[] = data.allFile.edges.map(({ node }) => {
    const { fluid, fixed } = node.childImageSharp;
    return {
      original: fluid.src,
      thumbnail: fixed.src,
      thumbnailClass: 'w-28 h-28 overflow-hidden active:',
    };
  });

  return (
    <Section>
      <div className="my-8 py-20 mx-auto w-full bg-stone-100">
        <div className="mx-8">
          <ReactImageGallery
            items={images}
            lazyLoad={true}
            renderThumbInner={(item) => (
              <img
                className="object-cover w-full h-full"
                src={item.thumbnail}
                alt={item.thumbnailAlt}
              />
            )}
          />
        </div>
      </div>
    </Section>
  );
}

export default Gallery;

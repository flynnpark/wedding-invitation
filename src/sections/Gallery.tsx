import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React, { useCallback, useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';

import Section from 'components/Section';

interface ImageData {
  allFile: {
    edges: {
      node: {
        childImageSharp: {
          fluid: FluidObject;
          fixed: FluidObject;
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
              fluid(maxWidth: 1280) {
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
  const thumbnailImages = data.allFile.edges.map(
    ({ node }) => node.childImageSharp.fixed.src
  );
  const originalImages = data.allFile.edges.map(
    ({ node }) => node.childImageSharp.fluid.src
  );
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <Section>
      <div className="my-8 py-20 mx-auto w-full bg-stone-100 max-w-xl">
        <div className="mx-4 md:mx-8 grid grid-cols-3 md:grid-cols-4 gap-2 ">
          {thumbnailImages.map((src, index) => (
            <img
              src={src}
              alt={src}
              key={index}
              onClick={() => openImageViewer(index)}
              className="w-full aspect-square cursor-pointer object-cover"
            />
          ))}
          {isViewerOpen ? (
            <ImageViewer
              src={originalImages}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          ) : null}
        </div>
      </div>
    </Section>
  );
}

export default Gallery;

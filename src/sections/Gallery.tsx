import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React, { useCallback, useState } from 'react';

import ImageViewer from 'components/ImageViewer';
import Section from 'components/Section';

interface QueryResult {
  allFile: {
    edges: {
      node: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
        name: string;
      };
    }[];
  };
}

function Gallery() {
  const data: QueryResult = useStaticQuery(graphql`
    {
      allFile(filter: { relativeDirectory: { eq: "gallery" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(width: 640)
            }
            name
          }
        }
      }
    }
  `);

  console.log(data);

  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

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
          {data.allFile.edges.map(
            ({ node: { childImageSharp, name } }, index) => {
              return (
                <button
                  key={index}
                  onClick={() => openImageViewer(index)}
                  className="cursor-pointer"
                >
                  <GatsbyImage
                    image={childImageSharp.gatsbyImageData}
                    alt={name}
                    className="w-full aspect-square cursor-pointer object-cover"
                  />
                </button>
              );
            }
          )}
          {isViewerOpen ? (
            <ImageViewer
              images={data.allFile.edges.map((edge) => edge.node)}
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

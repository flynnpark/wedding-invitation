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
          originalImage: IGatsbyImageData;
          smallImage: IGatsbyImageData;
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
              originalImage: gatsbyImageData(width: 1920, quality: 80)
              smallImage: gatsbyImageData(width: 130, height: 100, quality: 90)
            }
            name
          }
        }
      }
    }
  `);

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
    <Section className="my-8 py-20 w-full">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mx-2 md:mx-0">
          {data.allFile.edges.map(
            (
              {
                node: {
                  childImageSharp: { smallImage },
                  name,
                },
              },
              index
            ) => (
              <button
                key={index}
                onClick={() => openImageViewer(index)}
                className="cursor-pointer"
              >
                <GatsbyImage
                  image={smallImage}
                  alt={name}
                  className="w-full aspect-square cursor-pointer object-cover"
                />
              </button>
            )
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

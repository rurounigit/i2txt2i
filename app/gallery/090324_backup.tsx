"use client"

import React, { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';

const api = createApi({
  accessKey: '0D9CiPcQhtLhVZD9-iqskFBWKAGPI50xeiviaIhSd80', 
});

interface ImageData {
  id: number;
  url: string;
}

function ImageTable({ images }: { images: ImageData[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 md:grid-cols-4 bg-gray-600">
      {images.map((image) => (
        <div key={image.id} className="bg-gray-800 rounded p-1">
          <a href={image.url} target="_blank" rel="noopener noreferrer">
            <img
              src={image.url}
              alt={`Image ${image.id}`}
              className="w-100 h-100 rounded object-cover"
            />
          </a>
        </div>
      ))}
    </div>
  );
}

const MainTable: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imgPerPage, setImgPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.search.getPhotos({
          query: 'cow', // Replace with your desired search query
          perPage: 10, // Number of images to fetch
        });
        const imageResults = response?.response?.results;

        if (imageResults) {
          const imageUrls = imageResults.map((result) => result.urls.regular);
          setImages(
            imageUrls.map((url, index) => ({ id: index, url})),
          );
        } else {
          console.error('No image results found.');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-normal border-0 border-green-800">
      <ImageTable images={images} />
    </main>
  );
};

export default MainTable;

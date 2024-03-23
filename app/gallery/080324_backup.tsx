"use client"

// src/components/MainTable.tsx

import React, { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';

const api = createApi({
  accessKey: '0D9CiPcQhtLhVZD9-iqskFBWKAGPI50xeiviaIhSd80', // Replace with your actual access key
});

interface ImageData {
  id: number;
  url: string;
}

const MainTable: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

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
    <div className="grid grid-cols-3 gap-1 md:grid-cols-4 bg-gray-600">
      {images.map((image) => (
        <div key={image.id} className="bg-gray-800 rounded p-1">
          <img
            src={image.url}
            alt={`Image ${image.id}`}
            className="w-100 h-100 rounded object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default MainTable;

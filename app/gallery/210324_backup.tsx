"use client"

import { ImageResponse } from 'next/og';
import React, { useState, useEffect} from 'react';
import { useRouter , usePathname} from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import InfiniteScroll from 'react-infinite-scroll-component';

const apiKey : string | undefined = process.env.NEXT_PUBLIC_API_TOKEN;


interface ImageData {
  id: number;
  url: string;
  url_full: string;
}

function ImageTable({images, onImageClick}: {images: ImageData[], onImageClick: (url: string) => void}) { 
  return (
    <div className="grid grid-cols-3 p-1 gap-0 md:grid-cols-5 bg-dark-blue">
      {images.map((image) => (
        <div key={image.id} className="bg-dark-blue rounded p-1">
          <div
            className='cursor-pointer'
            onClick={(event) => {
              onImageClick(image.url_full);
            }}
          >
            <img
              src={image.url}
              alt={`Image ${image.id}`}
              className= "rounded object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ShowModal({ selectedImage, showModal, setShowModal }: { selectedImage: string | null, showModal: boolean, setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowModal(false)}>
        <div className="h-auto w-auto max-h-4/5 max-w-4/5" onClick={(e) => e.stopPropagation()}>
          <img
            src={selectedImage || ''}
            alt="Selected Image"
            className="rounded object-cover"
          />
        </div>
      </div>
    )
  );
}

let currentPage = 1;

const PAGE_SIZE = 50;

const MainTable: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const search_query = 'cow';


  const fetchRequest = async () => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${currentPage}&query=${search_query}&per_page=${PAGE_SIZE}&client_id=${apiKey}`
    );
    const data = await response.json();

    const images = data.results.map((image: any) => ({
        id: image.id,
        url: image.urls.raw + "&max-w=600&max-h=600&crop=entropy&fit=crop",
        url_full: image.urls.raw + "&w=1000&max-h=800&fit=clip"
        }));
      setImages(images);
    };

  useEffect(() => {
    fetchRequest();
  }, []);
  
  const loadMoreImages = async () => {
    const nextPage = currentPage + 1;
    currentPage = nextPage;
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${nextPage}&query=${search_query}&per_page=${PAGE_SIZE}&client_id=${apiKey}`
    );
    const data = await response.json();
    
    const more_images = data.results.map((image: any) => ({
      id: image.id,
      url: image.urls.raw + "&max-w=600&max-h=600&crop=entropy&fit=crop",
      url_full: image.urls.raw + "&w=1000&max-h=800&fit=clip"
    }));
    setImages(images => [...images, ...more_images]);
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    setShowModal(true);
  };

  


  return (
    <main className="flex min-h-screen flex-col items-center justify-normal bg-light-orange">
      <InfiniteScroll
      dataLength={images.length}
      next={loadMoreImages}
      hasMore={true} // Replace with a condition based on your data source
      loader={<p></p>}
      endMessage={<p>No more data to load.</p>}
    >
      <ShowModal selectedImage={selectedImage} showModal={showModal} setShowModal={setShowModal} />
      <ImageTable images={images} onImageClick={handleImageClick} />
      
      </InfiniteScroll>
      <div className='m-5 group rounded-full px-3 py-2 bg-pale-blue'>
      <button className='w-9 mr-4' onClick={loadMoreImages}>more...</button>          
      </div>
    </main>
  );
};

export default MainTable;

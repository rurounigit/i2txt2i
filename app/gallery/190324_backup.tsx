"use client"

import { ImageResponse } from 'next/og';
import React, { useState, useEffect } from 'react';
import { useRouter , usePathname} from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import InfiniteScroll from 'react-infinite-scroll-component';

const apiKey : string | undefined = process.env.NEXT_PUBLIC_API_TOKEN;

interface ImageData {
  id: number;
  url: string;
  url_full: string;
}

function ImageTable({images, currentPage, onImageClick}: {currentPage: number, images: ImageData[], onImageClick: (url: string) => void}) { 
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
     


const MainTable: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFull, setSelectedImageFull] = useState<string | null>(null);
  
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter();

  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1

  function changeCurrentPage (page: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(pathname + `?${params.toString()}`)
  }



  useEffect(() => {
    
    const fetchRequest = async () => {
      //const urls: Array<string> = [];

      //for (let i = 1; i <= currentPage; i++) {
      //  console.log(i);
      //  urls.push(`https://api.unsplash.com/search/photos?page=${i}&query=cow&per_page=15&client_id=${apiKey}`);
      //  } 


      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${currentPage}&query=cow&per_page=15&client_id=${apiKey}`
      );
      const data = await response.json();

      //const promises = urls.map((url) =>
      //  fetch(url).then((response) => response.json())
      //);
     // const data = await Promise.all(promises);
      

      const images = data.results.map((image: any) => ({
          id: image.id,
          url: image.urls.raw + "&max-w=600&max-h=600&crop=entropy&fit=crop",
          url_full: image.urls.raw + "&w=1000&max-h=800&fit=clip"
        }));
      setImages(images);
    };
    fetchRequest();
  }, [currentPage]);


  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    setShowModal(true);
  };

  const addImages = async () => {
    //const urls: Array<string> = [];

    //for (let i = 1; i <= currentPage; i++) {
    //  console.log(i);
    //  urls.push(`https://api.unsplash.com/search/photos?page=${i}&query=cow&per_page=15&client_id=${apiKey}`);
    //  } 

    changeCurrentPage(currentPage+1);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${currentPage}&query=cow&per_page=15&client_id=${apiKey}`
    );
    const data = await response.json();

    //const promises = urls.map((url) =>
    //  fetch(url).then((response) => response.json())
    //);
   // const data = await Promise.all(promises);
    

    const more_images = data.results.map((image: any) => ({
        id: image.id,
        url: image.urls.raw + "&max-w=600&max-h=600&crop=entropy&fit=crop",
        url_full: image.urls.raw + "&w=1000&max-h=800&fit=clip"
      }));

      setImages(images => [...images, ...more_images]);
    //setImages(more_images);
    console.log(more_images);
    console.log(images);


  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-normal bg-light-orange">
      <ShowModal selectedImage={selectedImage} showModal={showModal} setShowModal={setShowModal} />
      
      <div className='m-5 group rounded-full px-3 py-2 bg-pale-blue'>
        <label className='p-1'>page:</label>
        <input className='w-9 mr-2' type="number" value={currentPage} onChange={(e) => changeCurrentPage(Number(e.target.value))} />
      </div>
      <ImageTable images={images} currentPage={currentPage} onImageClick={handleImageClick} />
      <div className='m-5 group rounded-full px-3 py-2 bg-pale-blue'>
      <button className='w-9 mr-4' onClick={addImages}>more...</button>
      
      </div>
      
    </main>
  );
};

export default MainTable;

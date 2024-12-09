import React, { useState } from "react";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
          <div className="absolute inset-0 bg-black text-white  min-h-screen">
            <div className="bg-black p-8 grid gap-4">
              <div>
                <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                <button
                  onClick={() => setShowAllPhotos(false)}
                  className="flex fixed gap-1 py-2 px-4 rounded-2xl shadow shadow-black-500 bg-white text-black top-0 right-0 mt-5 mx-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Close
                </button>
              </div>
              {place?.photos?.length > 0 &&
                place.photos.map((photo) => (
                  <div>
                    <img src={"http://localhost:4000/uploads/" + photo}></img>
                  </div>
                ))}
            </div>
          </div>
        );
      }
    
  return (
    <div className="relative ">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer aspect-square object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[0]}
              ></img>
            </div>
          )}
        </div>
        <div className="grid ">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="cursor-pointer aspect-square object-cover"
              src={"http://localhost:4000/uploads/" + place.photos[1]}
            ></img>
          )}
          <div className=" overflow-hidden">
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer aspect-square object-cover relative top-2"
                src={"http://localhost:4000/uploads/" + place.photos[2]}
              ></img>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Show More Photos
      </button>
    </div>
  );
};

export default PlaceGallery;

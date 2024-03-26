"use client";

import React, { useEffect, useState } from "react";
import { getPhotos } from "../services/unsplash";
import InfiniteScroll from "react-infinite-scroll-component";
import { UnsplashPhoto } from "../../types";
import PhotoCard from "../components/PhotoCard";
import "./globals.css";

export default function Home() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  // It meant that we're initializing a state that is an object. This object will have strings as keys (which can be photo IDs) and boolean values indicating whether the photo is liked or not.
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  const [hasMore, setHasMore] = useState(true); // Track if more items can be loaded
  const [page, setPage] = useState(1);

  const handleLike = (id: string) => {
    const isLiked = !likedPhotos[id];

    setLikedPhotos((prevLikes: any) => ({
      ...prevLikes,
      [id]: isLiked || false,
    }));
  };

  const fetchPhotos = async () => {
    try {
      const fetchedPhotos = await getPhotos(page);

      if (fetchedPhotos?.length === 0) {
        setHasMore(false); // No more photos to fetch
        return;
      }

      setPhotos((prevPhotos) => [...prevPhotos, ...fetchedPhotos]);
      setPage((prevPage) => prevPage + 1); // Increment page for next fetch

      //  fetchedPhotos.forEach(async (photo) => {
      //    const res = await fetch(`/api/likes/get?photoId=${photo.id}`);
      //    const data = await res.json();
      //    console.log("fetcheddd", data?.likes);
      //    // setLikedPhotos((prev) => ({ ...prev, [photo.id]: data.likes }));
      //  });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos(); // Initial fetch
  }, []);

  return (
    <div className="bg-gray-100  min-h-screen p-12">
      <div className="max-w-7xl mx-auto">
        <InfiniteScroll
          dataLength={photos.length}
          next={fetchPhotos}
          hasMore={hasMore}
          loader={
            <h4 className="font-semibold text-2xl text-gray-500 text-center mb-5">
              Loading...
            </h4>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <p className="fixed top-0 right-0 font-semibold text-xl m-2">
              Total images: {photos.length}
            </p>
            {photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isLiked={likedPhotos[photo.id]}
                onLike={handleLike}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

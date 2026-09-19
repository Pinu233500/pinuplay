'use client';
import React, { useState } from 'react';

export default function Home() {
  const [songs, setSongs] = useState([
    { title: "Prism Shift", artist: "Halcyon Youth", album: "Golden Hour", url: "https://res.cloudinary.com/gyqyo2kv/video/upload/v1/pinuplay_songs/sample.mp3", duration: "2:45" }
  ]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setSongs([...songs, { 
          title: file.name.replace(/\.[^/.]+$/, ""), 
          artist: "Your uploads", 
          album: "Cloudinary", 
          url: data.url, 
          duration: "3:00" 
        }]);
        alert("Berhasil diunggah ke Cloudinary!");
      } else {
        alert("Gagal: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengunggah.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>🎵 Pinuply - Music Player</h1>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ backgroundColor: '#1DB954', color: '#fff', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', display: 'inline-block', fontWeight: 'bold' }}>
          {isUploading ? "Mengunggah..." : "Upload MP3 Baru"}
          <input type="file" accept="audio/*" onChange={handleUpload} style={{ display: 'none' }} disabled={isUploading} />
        </label>
      </div>

      <h2 style={{ fontSize: '20px', marginTop: '30px', marginBottom: '15px' }}>Daftar Putar Lagu:</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {songs.map((song, index) => (
          <li key={index} style={{ padding: '12px 15px', marginBottom: '8px', backgroundColor: '#181818', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{song.title}</div>
              <div style={{ fontSize: '12px', color: '#b3b3b3' }}>{song.artist} • {song.album}</div>
            </div>
            {song.url && (
              <button onClick={() => setCurrentSong(song)} style={{ backgroundColor: '#1DB954', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold' }}>
                Putar
              </button>
            )}
          </li>
        ))}
      </ul>

      {currentSong && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#282828', padding: '15px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #333' }}>
          <div>
            <div style={{ fontWeight: 'bold' }}>Memutar: {currentSong.title}</div>
            <div style={{ fontSize: '12px', color: '#b3b3b3' }}>{currentSong.artist}</div>
          </div>
          <audio controls src={currentSong.url} autoPlay style={{ width: '400px' }} />
        </div>
      )}
    </main>
  );
}

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { create } from 'zustand'

const useStore = create((set) => ({
  isModalOpen: false,
  selectedMonth: new Date(),
  uploadProgress: 0,
  alerts: [],
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })), // Corrected this line
  removeAlert: (id) => set((state) => ({ alerts: state.alerts.filter((alert) => alert.id !== id) })), // Corrected this line
}))

function App() {
  const [count, setCount] = useState(0)
  const isModalOpen = useStore((state) => state.isModalOpen)
  const openModal = useStore((state) => state.openModal)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={openModal}>Open Modal</button>
        {isModalOpen && <div>Modal is Open</div>}
         <input type="file" accept=".csv" onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const formData = new FormData();
            formData.append('csv', file);

            fetch('http://localhost:3000/upload', {
              method: 'POST',
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }} />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../components/App';

const mockDogResponses = [{
  message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
  status: 'success',
}, {
  message: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_5221.jpg',
  status: 'success'
}, {
  message: "https://images.dog.ceo/breeds/pinscher-miniature/n02107312_7391.jpg",
  status: "success"
}];

const randomIndex = Math.floor(Math.random() * 3);

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockDogResponses[randomIndex]),
  })
);

describe('React Simple Data Fetching Lab', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the loading message initially', async () => {
    render(<App />);
    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  });

  it('fetches and displays a dog image after loading', async () => {
    render(<App />);

    const dogImage = await screen.findByRole('img');

    expect(dogImage).toBeInTheDocument();
    expect(dogImage.src).toBe(mockDogResponses[randomIndex].message);
  });

  it('fetches a new dog image when the button is clicked', async () => {
    render(<App />);

    await screen.findByRole('img');

    const newMockDogResponse = {
      message: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_5004.jpg',
      status: 'success',
    };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(newMockDogResponse),
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const newDogImage = await screen.findByRole('img');
    expect(newDogImage.src).toBe(newMockDogResponse.message);
  });

  it('makes an API call when the component first renders', async () => {
    render(<App />);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://dog.ceo/api/breeds/image/random');
  });

  it('makes another API call when the button is clicked', async () => {
    render(<App />);

    await screen.findByRole('img');

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockDogResponses[randomIndex]),
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  });
});

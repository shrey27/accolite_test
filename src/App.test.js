import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
const URL = 'https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg'
const sampleData = {
  collection : {
    items: [{
      links : [{
        href : URL
      }]
    }]
  }
}

test('renders learn react link', async () => {
  let spy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: sampleData })
  const getImages = jest.fn();
  render(<App />);
  await act(() => {
    getImages()
  })
  expect(spy).toBeCalledWith('https://images-api.nasa.gov/search?q=moon')
  expect(getImages).toBeCalledWith()
  const linkElement = screen.getByAltText('moon')
  await expect(linkElement).toBeInTheDocument();
  expect(linkElement.src).toContain(URL);
});

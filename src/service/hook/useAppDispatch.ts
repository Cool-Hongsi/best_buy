import { useDispatch } from 'react-redux';
import { AppDispatch } from 'service/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

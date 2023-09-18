import { createHashRouter as hashRouter, createRoutesFromElements as routes } from 'react-router-dom';
import { LoaderFunctionArgs, defer, redirect, Route } from 'react-router';

import HistoryReplay from './pages/HistoryReplay';
import MainMenu from './pages/MainMenu';
import Gameplay from './pages/Gameplay';
import { createCheckersStore } from './stores/checkers-store';
import { useCheckersHistory } from './stores/checkers-history-store';
import CheckersApp from './CheckersApp';

export const router = hashRouter(routes
  (<Route path={'/'} element={<CheckersApp/>}>
    <Route index element={<MainMenu/>}/>
    <Route path={'game/new'} loader={() => {
      throw redirect(`/game/${Date.now()}`)
    }}/>
    <Route path={'game/:id'}>
      <Route index element={<Gameplay/>} loader={getGameLoader}/>
      <Route path={'history'} element={<HistoryReplay/>} loader={getHistoryLoader}/>
    </Route>
  </Route>
));

function getGameLoader(loader: LoaderFunctionArgs) {
  const id = parseInt(loader.params['id'] as string);
  const store = new Promise((resolve) => {
    setTimeout(() => resolve(createCheckersStore(id)), 2000);
  });

  return defer({ store });
}

function getHistoryLoader(loader: LoaderFunctionArgs) {
  const histories = useCheckersHistory.getState().histories
  const id = parseInt(loader.params['id'] as string);
  const history = histories.find((value) => value.id === id);

  if (!history) {
    throw redirect('/');
  }

  const store = new Promise((resolve) => {
    setTimeout(() => resolve(createCheckersStore(id, 'history')), 2000);
  });

  return defer({ store, history });
}
import React from 'react';
import './App.css';
import {BrowserRouter , Route, Switch} from 'react-router-dom'
import HomePage from './routes/HomePage'
import SnippetPage from './routes/SnippetPage'
import Page404 from './routes/Page404'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <div>
              <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/snippet/:snippetId" component={SnippetPage}/>
                <Route  component={Page404}/>
              </Switch>
            </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

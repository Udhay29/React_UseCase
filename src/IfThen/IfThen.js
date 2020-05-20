import React, {useState, useRef, useEffect} from 'react';
import DnD from './Dnd'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import 'bootstrap/dist/css/bootstrap.min.css';

function IfThen() {
    const [activeTab, SetActiveTab] = useState(1);
    
    
    const handleSelect = (selectedTab) => {
        // The active tab must be set into the state so that
        // the Tabs component knows about the change and re-renders.
        SetActiveTab(selectedTab);
      }
    
    return (
        <div className="wrapper">
            <div className="heading">
                <h4>If node Space Test</h4>
                <p>If node</p>
            </div>
            <Tabs className="myClass" activeKey={activeTab} onSelect={handleSelect}>
                <Tab eventKey={1} title="Conditions">
                <div>                    
                    
                    <DndProvider backend={Backend}>
                        <DnD />
                    </DndProvider>
                   
                </div>
                </Tab>
                <Tab eventKey={2} title="Description"><div>Tab 2 content</div></Tab>
            </Tabs>
        </div>
    )
}

export default IfThen;
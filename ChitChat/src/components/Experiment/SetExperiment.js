import React from 'react';
import { useState } from 'react';
import AgentCard from './AgentCard';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { db } from '../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SetExperiment = () => {
    const [expSubject, setExpSubject] = useState('');
    const [expPrompt, setExpPrompt] = useState('');
    const [numAIAgents, setNumAIAgents] = useState(0);
    const [AIAgents, setAIAgents] = useState([]);
    const newExperiment = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, 'experiments'), {
            id: uuidv4(),
            subject: expSubject,
            openingPrompt: expPrompt,
            created: serverTimestamp(),
            aiAgents: AIAgents,
            active: true,
        });
        setExpSubject('');
        setExpPrompt('');
        setNumAIAgents(0);
        setAIAgents([]);
    };

    const incAgents = () => {
        if (numAIAgents < 3) {
            setNumAIAgents(numAIAgents + 1);
            AIAgents.push({ id: uuidv4(), name: '', sentiment: '' });
        }
    };
    const decAgents = () => {
        if (numAIAgents > 0) {
            setNumAIAgents(numAIAgents - 1);
            AIAgents.pop();
        }
    };

    const setAgent = (id, agentObj) => {
        const updatedAgents = AIAgents.map((agent) => {
            if (agent.id === id) {
                if ('name' in agentObj)
                    return { ...agent, name: agentObj.name };
                if ('sentiment' in agentObj)
                    return { ...agent, sentiment: agentObj.sentiment };
            }
            return agent;
        });
        setAIAgents(updatedAgents);
    };

    return (
        <div className="App d-flex justify-content-center">
            <Card style={{ width: '50%', height: '75%' }} data-bs-theme="dark">
                <Form onSubmit={(e) => newExperiment(e)}>
                    <Stack direction="vertical" gap={3}>
                        <Form.Group className="mb-3">
                            <Form.Label> Experiment Subject: </Form.Label>
                            <Form.Control
                                type="text"
                                value={expSubject}
                                onChange={(e) => setExpSubject(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                {' '}
                                Experiment Starting prompt:{' '}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={expPrompt}
                                onChange={(e) => setExpPrompt(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Stack direction="horizontal" gap={3}>
                                <Form.Label>
                                    {' '}
                                    Number of Intelligent Agents:{' '}
                                </Form.Label>

                                <Button
                                    onClick={incAgents}
                                    className="btn-sm"
                                    variant="secondary">
                                    +
                                </Button>
                                <Form.Label>{numAIAgents}</Form.Label>
                                <Button
                                    onClick={decAgents}
                                    className="btn-sm"
                                    variant="secondary">
                                    -
                                </Button>
                            </Stack>
                        </Form.Group>
                    </Stack>
                    <Stack direction="horizontal" gap={3}>
                        {AIAgents?.map((agent) => {
                            return (
                                <AgentCard
                                    key={agent.id}
                                    agent={agent}
                                    setAgent={setAgent}
                                />
                            );
                        })}
                    </Stack>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
        </div>
    );
};
export default SetExperiment;

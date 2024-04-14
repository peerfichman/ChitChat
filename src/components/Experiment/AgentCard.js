import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const AgentCard = ({ agent, setAgent }) => {
    return (
        <Card>
            <Form.Group className="mb-3">
                <Form.Label> AI agent name: </Form.Label>
                <Form.Control
                    type="text"
                    value={agent.name}
                    onChange={(e) =>
                        setAgent(agent.id, { name: e.target.value })
                    }
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label> Sentiment: </Form.Label>
                <Form.Select
                    size="sm"
                    value={agent.sentiment}
                    onChange={(e) =>
                        setAgent(agent.id, { sentiment: e.target.value })
                    }>
                    <option hidden value=""></option>
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                </Form.Select>
            </Form.Group>
        </Card>
    );
};

export default AgentCard;

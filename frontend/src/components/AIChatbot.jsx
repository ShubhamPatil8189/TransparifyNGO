import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hi! I am the Transparify AI Assistant. Ask me about donations, NGOs, or transparency.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('https://transparifyngo.onrender.com/api/ai/chat', { message: userMsg });
            setMessages(prev => [...prev, { role: 'assistant', text: res.data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting to my brain right now." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <Card className="w-80 mb-4 shadow-xl border-t-4 border-t-blue-500">
                    <CardHeader className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-blue-500" /> Transparify Helper
                            </CardTitle>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleChat}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 h-64 overflow-y-auto space-y-3 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border shadow-sm text-gray-800'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="text-xs text-gray-400 text-center">Thinking...</div>}
                    </CardContent>
                    <CardFooter className="p-3 border-t bg-white">
                        <div className="flex w-full gap-2">
                            <Input
                                placeholder="Ask me anything..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                className="h-8 text-sm"
                            />
                            <Button size="icon" className="h-8 w-8" onClick={sendMessage} disabled={loading}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}
            <Button
                onClick={toggleChat}
                className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
                {isOpen ? <X /> : <MessageCircle />}
            </Button>
        </div>
    );
};

export default AIChatbot;

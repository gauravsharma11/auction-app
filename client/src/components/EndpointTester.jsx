import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

function EndpointTester() {
  const [reservePrice, setReservePrice] = useState('');
  const [auctionItems, setAuctionItems] = useState([]);
  const [auctionItem, setAuctionItem] = useState([]);
  const [itemId, setItemId] = useState('');
  const [description, setDescription] = useState('');
  const [auctionItemId, setAuctionItemId] = useState('');
  const [maxAutoBidAmount, setMaxAutoBidAmount] = useState('');
  const [bidderName, setBidderName] = useState('');
  const [getResponse, setGetResponse] = useState([]);
  const [error, setError] = useState('');

  const handleGetAuctionItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auctionItems');
      setAuctionItems(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data.message);
      setAuctionItems([]);
    }
  };

  const handleGetAuctionItemById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/auctionItems/${auctionItemId}`);
      setAuctionItem([response.data]);
      setError('');
    } catch (error) {
      setError(error.response.data.message);
      setAuctionItem([]);
    }
  };

  const handlePostAuctionItem = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auctionItems', {
        reservePrice: parseFloat(reservePrice),
        itemId,
        description
      });
      if(response.status === 201) {
        setGetResponse([`Auction item ${response.auctionItemId} created successfully`]);
      }
      setError('');
    } catch (error) {
      setError(error.response.data.message);
      setGetResponse([]);
    }
  };

  const handlePostBid = async () => {
    try {
      const response = await axios.post('http://localhost:3000/bids', {
        auctionItemId,
        maxAutoBidAmount,
        bidderName
      });
      if(response.status === 201) {
        setGetResponse([`Bid placed for item ${response.data.auctionItemId} by ${bidderName} with amount ${response.data.currentBid}`]);
      }
      setError('');
    } catch (error) {
      setError(error.response.data.message);
      setGetResponse([]);
    }
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>Auction App</Typography>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Accordion sx={{ marginBottom: '10px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="h6">Get Auction Items</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="contained" color="primary" onClick={handleGetAuctionItems}>Get All Auction Items</Button>
            {auctionItems.length > 0 && (
              <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Auction Item ID</TableCell>
                      <TableCell>Current Bid</TableCell>
                      <TableCell>Reserve Price</TableCell>
                      <TableCell>Item ID</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {auctionItems.map(item => (
                      <TableRow key={item.auctionItemId}>
                        <TableCell>{item.auctionItemId}</TableCell>
                        <TableCell>{item.currentBid}</TableCell>
                        <TableCell>{item.reservePrice}</TableCell>
                        <TableCell>{item.item.itemId}</TableCell>
                        <TableCell>{item.item.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ marginBottom: '10px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography variant="h6">Get Auction Item by ID</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Auction Item ID"
              variant="outlined"
              value={auctionItemId}
              onChange={(e) => setAuctionItemId(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleGetAuctionItemById}>Get Auction Item</Button>
            {auctionItem.length > 0 && (
              <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Auction Item ID</TableCell>
                      <TableCell>Current Bid</TableCell>
                      <TableCell>Reserve Price</TableCell>
                      <TableCell>Item ID</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {auctionItem.map(item => (
                      <TableRow key={item.auctionItemId}>
                        <TableCell>{item.auctionItemId}</TableCell>
                        <TableCell>{item.currentBid}</TableCell>
                        <TableCell>{item.reservePrice}</TableCell>
                        <TableCell>{item.item.itemId}</TableCell>
                        <TableCell>{item.item.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ marginBottom: '10px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
            <Typography variant="h6">Create Auction Item</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Reserve Price"
              variant="outlined"
              value={reservePrice}
              onChange={(e) => setReservePrice(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="Item ID"
              variant="outlined"
              value={itemId}
              onChange={(e) => { setItemId(e.target.value) }}
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handlePostAuctionItem}>Create Auction Item</Button>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
            <Typography variant="h6">Place Bid</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Auction Item ID"
              variant="outlined"
              value={auctionItemId}
              onChange={(e) => setAuctionItemId(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="Max Auto Bid Amount"
              variant="outlined"
              value={maxAutoBidAmount}
              onChange={(e) => setMaxAutoBidAmount(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="Bidder Name"
              variant="outlined"
              value={bidderName}
              onChange={(e) =>  setBidderName(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handlePostBid}>Place Bid</Button>
          </AccordionDetails>
        </Accordion>
      </Box>
      {getResponse && <Typography variant="body1" color="green" sx={{ marginTop: '20px' }}>{getResponse}</Typography>}
      {error && <Typography variant="body1" color="error" sx={{ marginTop: '20px' }}>{error}</Typography>}
    </Box>
  );
}

export default EndpointTester;


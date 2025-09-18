import React, { useState, useEffect } from 'react';
import { Modal, Button, Badge, Table, Spinner } from 'react-bootstrap';
import { FaTicketAlt, FaCalendarAlt, FaInfoCircle, FaClock } from 'react-icons/fa';

const TicketAvailabilityPopup = () => {
  const [show, setShow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [ticketsRemaining, setTicketsRemaining] = useState(0);
  const [isSoldOut, setIsSoldOut] = useState(false);

  // Generate dates for next 7 days including today
  const getNextSevenDays = () => {
    const dates = [];
    const today = new Date();
    
    // Start from today
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip if it's a Monday (assuming park is closed on Mondays)
      if (date.getDay() === 1) {
        continue;
      }
      
      dates.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: date
      });
      
      // Stop when we have 7 days
      if (dates.length === 7) break;
    }
    
    return dates;
  };

  // Initialize ticket data with consistent mock data
  useEffect(() => {
    const initializeTicketData = () => {
      setLoading(true);
      try {
        // Generate consistent mock data for the next 7 days
        const days = getNextSevenDays();
        const today = new Date();
        
        const mockData = days.map((day, index) => {
          const baseTickets = 500; // 500 tickets per date
          
          // Calculate days from today
          const diffTime = Math.abs(day.fullDate - today);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          // More tickets available for future dates
          const available = Math.min(
            500,
            Math.max(
              50, 
              500 - (diffDays * 25) // More tickets booked as date gets closer
            )
          );
          const booked = baseTickets - available;
          
          // For today, if it's after 5 PM, show as fully booked
          const isToday = day.fullDate.toDateString() === today.toDateString();
          const after5PM = today.getHours() >= 17;
          
          return {
            ...day, // Include all day properties (date, day, dateNum, month)
            totalTickets: baseTickets,
            bookedTickets: isToday && after5PM ? baseTickets : booked,
            availableTickets: isToday && after5PM ? 0 : available,
            isSoldOut: (isToday && after5PM) || booked >= baseTickets
          };
        });
        
        setTicketData(mockData);
        
        // Set today's data as default
        if (mockData.length > 0) {
          const today = mockData[0];
          setSelectedDate(today.date);
          setTicketsRemaining(today.availableTickets);
          setIsSoldOut(today.availableTickets <= 0);
        }
      } catch (error) {
        console.error('Error initializing ticket data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeTicketData();
  }, []);

  const handleDateSelect = (date) => {
    const selected = ticketData.find(item => item.date === date);
    if (selected) {
      setSelectedDate(date);
      setTicketsRemaining(selected.availableTickets);
      setIsSoldOut(selected.availableTickets <= 0);
    }
  };

  // Check if current time is after 5 PM
  const isAfter5PM = () => {
    const now = new Date();
    return now.getHours() >= 17; // 5 PM
  };

  const isBookingClosed = isAfter5PM();
  const popupStyle = {
    position: 'fixed',
    bottom: '30px',
    left: '30px',
    zIndex: 1000,
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    backgroundColor: isBookingClosed ? '#6c757d' : (isSoldOut ? '#dc3545' : '#28a745'),
    color: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    maxWidth: '350px',
    transform: isHovered ? 'translateY(-5px)' : 'none',
    border: `2px solid ${isBookingClosed ? '#5a6268' : (isSoldOut ? '#bd2130' : '#218838')}`
  };

  const badgeStyle = {
    fontSize: '1rem',
    padding: '8px 12px',
    marginLeft: '10px',
    backgroundColor: isBookingClosed ? '#6c757d' : (isSoldOut ? '#bd2130' : '#218838'),
    color: 'white'
  };


  const getDateStatus = (day) => {
    const isClosed = isAfter5PM();
    
    if (isClosed) {
      return { 
        text: 'Closed for Today', 
        class: 'text-secondary', 
        icon: '🔒',
        timing: 'Closed after 5 PM'
      };
    }
    
    if (day.isSoldOut) return { text: 'Sold Out', class: 'text-danger', icon: '❌', timing: '9:00 AM - 5:00 PM' };
    if (day.availableTickets === 0) return { text: 'Fully Booked', class: 'text-danger', icon: '⛔', timing: '9:00 AM - 5:00 PM' };
    if (day.availableTickets < 50) return { 
      text: 'Selling Fast', 
      class: 'text-warning', 
      icon: '⚠️',
      timing: '9:00 AM - 5:00 PM'
    };
    if (day.availableTickets < 150) return { 
      text: 'Limited', 
      class: 'text-info', 
      icon: 'ℹ️',
      timing: '9:00 AM - 5:00 PM'
    };
    return { 
      text: `${day.availableTickets} Available`, 
      class: 'text-success', 
      icon: '✅',
      timing: '9:00 AM - 5:00 PM'
    };
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      {show && (
        <div 
          style={popupStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setShowDetails(true)}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <FaTicketAlt className="me-2" />
              <strong>{isBookingClosed ? 'Booking Status' : 'Ticket Availability'}</strong>
            </div>
            <Badge pill style={badgeStyle}>
              {loading ? '...' : 
               isBookingClosed ? 'CLOSED' : 
               isSoldOut ? 'SOLD OUT' : 
               `${ticketsRemaining} Available`}
            </Badge>
          </div>
          
          <div className="mt-2">
            <small className="d-flex align-items-center">
              <FaCalendarAlt className="me-1" />
              {selectedDate && formatDate(selectedDate)}
              <span className="ms-2">
                <FaInfoCircle /> {isBookingClosed ? 'Check back tomorrow' : 'Click for more dates'}
              </span>
            </small>
            {isBookingClosed && (
              <small className="d-flex align-items-center mt-1">
                <FaClock className="me-1" />
                Booking hours: 9:00 AM - 5:00 PM
              </small>
            )}
          </div>
        </div>
      )}

      <Modal 
        show={showDetails} 
        onHide={() => setShowDetails(false)} 
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Ticket Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading availability...</p>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="mb-0">Ticket Availability by Date</h5>
                  <small className="text-muted">500 tickets available per date | Booking: 9:00 AM - 5:00 PM</small>
                </div>
                <div className="badge bg-primary">500 Tickets per date</div>
              </div>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {ticketData.map((day) => {
                  const status = getDateStatus(day);
                  const isSelected = selectedDate === day.date;
                  const percentage = Math.round((day.bookedTickets / day.totalTickets) * 100);
                  const isFullyBooked = day.availableTickets === 0;
                  
                  return (
                    <div 
                      key={day.date}
                      className={`p-2 border rounded text-center cursor-pointer position-relative overflow-hidden ${
                        isSelected ? 'border-primary bg-light' : ''
                      } ${isFullyBooked ? 'bg-light' : ''}`}
                      style={{ 
                        minWidth: '100px',
                        opacity: isFullyBooked ? 0.7 : 1
                      }}
                      onClick={() => !isFullyBooked && handleDateSelect(day.date)}
                    >
                      {isFullyBooked ? (
                        <div className="position-absolute top-0 start-0 w-100 text-center bg-secondary text-white small" style={{fontSize: '10px'}}>
                          FULLY BOOKED
                        </div>
                      ) : (
                        <div className="position-absolute top-0 start-0 w-100 text-center bg-success text-white small" style={{fontSize: '10px'}}>
                          {day.availableTickets} / 500
                        </div>
                      )}
                      <div className="fw-bold mt-2">{day.day}</div>
                      <div className="small">{day.dateNum} {day.month}</div>
                      <div className={`small fw-bold ${status.class}`}>
                        <div className="d-flex flex-column align-items-center">
                          <div className="d-flex align-items-center">
                            <span className="me-1">{status.icon}</span>
                            <span>{status.text}</span>
                          </div>
                          {!isFullyBooked && (
                            <div className="extra-small text-muted">
                              {day.availableTickets} tickets left
                            </div>
                          )}
                        </div>
                        <div className="extra-small text-muted">{status.timing}</div>
                        {isAfter5PM() && new Date(day.date).toDateString() === new Date().toDateString() && (
                          <div className="extra-small text-danger">Booking closed for today</div>
                        )}
                      </div>
                      {!day.isSoldOut && (
                        <div className="progress mt-1" style={{height: '5px'}}>
                          <div 
                            className={`progress-bar ${
                              percentage > 90 ? 'bg-danger' : 
                              percentage > 70 ? 'bg-warning' : 'bg-success'
                            }`} 
                            role="progressbar" 
                            style={{width: `${percentage}%`}}
                            aria-valuenow={percentage}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="table-responsive">
                <Table striped bordered hover className="mb-4">
                  <thead className="table-dark">
                    <tr>
                      <th>Date</th>
                      <th>Available</th>
                      <th>Booked</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketData.map((day) => {
                      const status = getDateStatus(day);
                      const percentage = Math.round((day.bookedTickets / day.totalTickets) * 100);
                      const isFullyBooked = day.availableTickets === 0;
                      
                      return (
                        <tr 
                          key={day.date} 
                          className={`${selectedDate === day.date ? 'table-primary' : ''} ${isFullyBooked ? 'table-secondary' : ''}`}
                          onClick={() => !isFullyBooked && handleDateSelect(day.date)}
                          style={{ 
                            cursor: isFullyBooked ? 'not-allowed' : 'pointer',
                            opacity: isFullyBooked ? 0.8 : 1
                          }}
                        >
                          <td className="fw-bold">
                            {formatDate(day.date)}
                            {isFullyBooked && <span className="badge bg-secondary ms-2">Fully Booked</span>}
                          </td>
                          <td className={`fw-bold ${day.availableTickets < 50 ? 'text-warning' : ''}`}>
                            {day.availableTickets}
                          </td>
                          <td>{day.bookedTickets}</td>
                          <td>{day.totalTickets}</td>
                          <td className={status.class}>
                            <div>
                              <div className="d-flex align-items-center">
                                <span className="me-2">{status.icon}</span>
                                {status.text}
                              </div>
                              <div className="extra-small text-muted">Timing: {status.timing || '9:00 AM - 5:00 PM'}</div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="progress flex-grow-1 me-2" style={{height: '8px'}}>
                                <div 
                                  className={`progress-bar ${
                                    percentage > 90 ? 'bg-danger' : 
                                    percentage > 70 ? 'bg-warning' : 'bg-success'
                                  }`} 
                                  role="progressbar" 
                                  style={{width: `${percentage}%`}}
                                  aria-valuenow={percentage}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <small className="text-muted">{percentage}%</small>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              
              <div className="alert alert-info mt-4">
                <div className="d-flex align-items-start">
                  <FaInfoCircle className="me-2 flex-shrink-0 mt-1" style={{fontSize: '1.2rem'}} />
                  <div>
                    <div className="mb-2">
                      <strong>Booking Information:</strong>
                      <ul className="mb-0 mt-2">
                        <li>⏰ <strong>Booking Hours:</strong> 9:00 AM to 5:00 PM</li>
                        <li>🚫 <strong>Closed:</strong> After 5:00 PM daily</li>
                        <li>🎫 <strong>Ticket Limit:</strong> 500 per date</li>
                        <li>⏳ <strong>First-come, first-served</strong></li>
                        <li>📅 Each date has its own 500-ticket quota</li>
                      </ul>
                      {isAfter5PM() && (
                        <div className="alert alert-warning mt-3 mb-0 py-2">
                          <i className="fas fa-exclamation-triangle me-2"></i>
                          <strong>Booking Closed:</strong> Online booking is currently closed. Please visit us tomorrow between 9:00 AM to 5:00 PM.
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <strong>Available Tickets Today:</strong>
                      <div className="progress mt-2" style={{height: '10px'}}>
                        <div 
                          className={`progress-bar ${ticketsRemaining > 100 ? 'bg-success' : ticketsRemaining > 0 ? 'bg-warning' : 'bg-danger'}`}
                          role="progressbar" 
                          style={{width: `${(ticketsRemaining / 500) * 100}%`}}
                          aria-valuenow={ticketsRemaining}
                          aria-valuemin="0"
                          aria-valuemax="500"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-1 small">
                        <span>0</span>
                        <span>250</span>
                        <span>500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TicketAvailabilityPopup;

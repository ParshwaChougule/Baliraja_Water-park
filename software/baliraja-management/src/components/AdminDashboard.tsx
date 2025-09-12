import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tab,
  Tabs,
  Alert,
  Badge,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  LocalOffer as PackageIcon,
  AttachMoney as MoneyIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Sync as SyncIcon,
  Web as WebIcon,
  Store as StoreIcon,
  Agriculture as AgricultureIcon,
  Pool as PoolIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FirebaseService, { FirebaseBooking, WebsitePackage } from '../services/firebaseService';

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  is_active: boolean;
  category?: string;
  image_url: string;
  facilities?: string;
}

interface Ticket {
  id: number;
  ticket_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  package_name: string;
  adults: number;
  children: number;
  total_amount: number;
  payment_status: string;
  visit_date: string;
  is_used: boolean;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [packages, setPackages] = useState<Package[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [openPackageDialog, setOpenPackageDialog] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [packageForm, setPackageForm] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    facilities: '',
    image_url: ''
  });
  
  // Firebase/Website data states
  const [websiteBookings, setWebsiteBookings] = useState<FirebaseBooking[]>([]);
  const [websitePackages, setWebsitePackages] = useState<WebsitePackage[]>([]);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  
  const navigate = useNavigate();

  const API_BASE = 'http://localhost:8080/api';

  useEffect(() => {
    fetchPackages();
    fetchTickets();
    syncWebsiteData();
    
    // Set up real-time listener for website bookings
    const unsubscribe = FirebaseService.listenToBookings((bookings) => {
      setWebsiteBookings(bookings);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API_BASE}/packages-simple.php`);
      if (response.data.records) {
        setPackages(response.data.records);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${API_BASE}/tickets-simple.php`);
      if (response.data.records) {
        setTickets(response.data.records);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Firebase/Website sync functions
  const syncWebsiteData = async () => {
    setSyncLoading(true);
    setSyncError(null);
    
    try {
      // Fetch website bookings from Firebase
      const bookingsResult = await FirebaseService.getBookings();
      if (bookingsResult.success && bookingsResult.bookings) {
        setWebsiteBookings(bookingsResult.bookings);
      } else {
        throw new Error(bookingsResult.error || 'Failed to fetch bookings');
      }
      
      // Get website packages (static data)
      const packages = FirebaseService.getWebsitePackages();
      setWebsitePackages(packages);
      
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Error syncing website data:', error);
      setSyncError((error as Error).message);
    } finally {
      setSyncLoading(false);
    }
  };

  const getBookingStats = () => {
    return FirebaseService.getBookingStats(websiteBookings);
  };

  const handlePackageSubmit = async () => {
    try {
      const packageData = {
        ...packageForm,
        price: parseFloat(packageForm.price)
      };

      if (editingPackage) {
        await axios.put(`${API_BASE}/packages.php`, {
          ...packageData,
          id: editingPackage.id
        });
      } else {
        await axios.post(`${API_BASE}/packages.php`, packageData);
      }

      setOpenPackageDialog(false);
      setEditingPackage(null);
      setPackageForm({
        name: '',
        description: '',
        price: '',
        duration: '',
        facilities: '',
        image_url: ''
      });
      fetchPackages();
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setPackageForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
      duration: pkg.duration,
      facilities: pkg.facilities || '',
      image_url: pkg.image_url
    });
    setOpenPackageDialog(true);
  };

  const handleDeletePackage = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/packages.php`, {
        data: { id }
      });
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const stats = {
    totalTickets: tickets.length,
    todayTickets: tickets.filter(t => 
      new Date(t.created_at).toDateString() === new Date().toDateString()
    ).length,
    totalRevenue: tickets.reduce((sum, t) => sum + parseFloat(t.total_amount.toString()), 0),
    activePackages: packages.filter(p => p.is_active).length
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard - Baliraja Water Park
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Stats Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Tickets
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalTickets}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Today's Tickets
                  </Typography>
                  <Typography variant="h4">
                    {stats.todayTickets}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MoneyIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4">
                    ₹{stats.totalRevenue.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PackageIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Active Packages
                  </Typography>
                  <Typography variant="h4">
                    {stats.activePackages}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Tabs */}
        <Card>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Packages Management" />
            <Tab label={
              <Badge badgeContent={websiteBookings.length} color="primary">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WebIcon />
                  Website Bookings
                </Box>
              </Badge>
            } />
            <Tab label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StoreIcon />
                Website Packages
              </Box>
            } />
            <Tab label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AgricultureIcon />
                Baliraja Agro Tourism
              </Box>
            } />
            <Tab label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PoolIcon />
                Baliraja Fun & Water Park
              </Box>
            } />
            <Tab label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon />
                Baliraja Total Business
              </Box>
            } />
          </Tabs>

          {/* Packages Tab */}
          {tabValue === 0 && (
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Packages</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenPackageDialog(true)}
                >
                  Add Package
                </Button>
              </Box>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {packages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell>{pkg.name}</TableCell>
                        <TableCell>₹{pkg.price}</TableCell>
                        <TableCell>{pkg.duration}</TableCell>
                        <TableCell>
                          <Chip 
                            label={pkg.is_active ? 'Active' : 'Inactive'} 
                            color={pkg.is_active ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEditPackage(pkg)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeletePackage(pkg.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          )}

          {/* Website Bookings Tab */}
          {tabValue === 1 && (
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Website Bookings (Firebase)</Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<SyncIcon />}
                  onClick={syncWebsiteData}
                  disabled={syncLoading}
                >
                  {syncLoading ? 'Syncing...' : 'Sync Now'}
                </Button>
              </Box>
              
              {syncError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {syncError}
                </Alert>
              )}
              
              {lastSyncTime && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Last synced: {lastSyncTime.toLocaleString()}
                </Typography>
              )}
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Visit Date</TableCell>
                      <TableCell>Guests</TableCell>
                      <TableCell>Package</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Payment Split</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Booked On</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {websiteBookings.map((booking) => {
                      // Use stored payment split data if available, otherwise calculate 60/40 split
                      const agroAmount = booking.paymentSplit?.agroTourismAmount || Math.round(booking.totalAmount * 0.6);
                      const waterparkAmount = booking.paymentSplit?.funWaterparkAmount || Math.round(booking.totalAmount * 0.4);
                      const splitProcessed = booking.paymentSplit?.splitProcessed || false;
                      
                      return (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.name}</TableCell>
                          <TableCell>{booking.email}</TableCell>
                          <TableCell>{booking.phone}</TableCell>
                          <TableCell>{booking.visitDate}</TableCell>
                          <TableCell>{booking.adults + booking.children} ({booking.adults}A + {booking.children}C)</TableCell>
                          <TableCell>{booking.packageName}</TableCell>
                          <TableCell>₹{booking.totalAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AgricultureIcon sx={{ fontSize: 16, color: 'success.main' }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                  ₹{agroAmount.toLocaleString()} (60%)
                                </Typography>
                                {splitProcessed && (
                                  <Chip label="✓" size="small" color="success" sx={{ minWidth: 'auto', width: 20, height: 20 }} />
                                )}
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PoolIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                  ₹{waterparkAmount.toLocaleString()} (40%)
                                </Typography>
                                {splitProcessed && (
                                  <Chip label="✓" size="small" color="success" sx={{ minWidth: 'auto', width: 20, height: 20 }} />
                                )}
                              </Box>
                              {!splitProcessed && booking.status === 'confirmed' && (
                                <Typography variant="caption" color="warning.main" sx={{ fontSize: '10px' }}>
                                  Split Pending
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={booking.status.toUpperCase()} 
                              color={
                                booking.status === 'confirmed' ? 'success' :
                                booking.status === 'pending' ? 'warning' :
                                booking.status === 'cancelled' ? 'error' : 'default'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {websiteBookings.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No website bookings found. Make sure Firebase is connected.
                  </Typography>
                </Box>
              )}
            </CardContent>
          )}

          {/* Website Packages Tab */}
          {tabValue === 2 && (
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Website Packages</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                These are the packages available on your website for customers to book.
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 3 }}>
                {websitePackages.map((pkg) => (
                  <Card key={pkg.id} sx={{ border: pkg.popular ? '2px solid' : '1px solid', borderColor: pkg.popular ? 'primary.main' : 'divider' }}>
                    {pkg.popular && (
                      <Box sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center', py: 1 }}>
                        <Typography variant="body2" fontWeight="bold">MOST POPULAR</Typography>
                      </Box>
                    )}
                    <CardContent>
                      <Typography variant="h5" gutterBottom>{pkg.name}</Typography>
                      <Typography variant="h3" color="primary.main" gutterBottom>
                        ₹{pkg.price.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        per {pkg.unit}
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="subtitle2" gutterBottom>Features:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {pkg.features.map((feature, index) => (
                          <Chip 
                            key={index} 
                            label={feature} 
                            size="small" 
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
              
              {websitePackages.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No website packages found.
                  </Typography>
                </Box>
              )}
            </CardContent>
          )}

          {/* Baliraja Agro Tourism Tab */}
          {tabValue === 3 && (
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Baliraja Agro Tourism Revenue & Bookings</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Revenue from 60% payment split of all water park bookings
              </Typography>
              
              {/* Agro Tourism Revenue Stats */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3, mb: 4 }}>
                <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <AgricultureIcon sx={{ fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6">Total Revenue (60%)</Typography>
                        <Typography variant="h4">
                          ₹{websiteBookings.reduce((sum, booking) => {
                            const agroAmount = booking.paymentSplit?.agroTourismAmount || Math.round(booking.totalAmount * 0.6);
                            return booking.status === 'confirmed' ? sum + agroAmount : sum;
                          }, 0).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">From all confirmed bookings</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">Total Bookings</Typography>
                    <Typography variant="h5">{websiteBookings.filter(b => b.status === 'confirmed').length}</Typography>
                    <Typography variant="body2" color="success.main">Confirmed bookings</Typography>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">This Month Revenue</Typography>
                    <Typography variant="h5">
                      ₹{websiteBookings
                        .filter(b => b.status === 'confirmed' && b.createdAt.startsWith(new Date().toISOString().slice(0, 7)))
                        .reduce((sum, booking) => {
                          const agroAmount = booking.paymentSplit?.agroTourismAmount || Math.round(booking.totalAmount * 0.6);
                          return sum + agroAmount;
                        }, 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="success.main">60% share</Typography>
                  </CardContent>
                </Card>
              </Box>
              
              <Typography variant="h6" sx={{ mb: 2 }}>Agro Tourism Revenue Breakdown</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Booking Date</TableCell>
                      <TableCell>Visit Date</TableCell>
                      <TableCell>Total Amount</TableCell>
                      <TableCell>Agro Tourism Share (60%)</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {websiteBookings.filter(booking => booking.status === 'confirmed').map((booking) => {
                      const agroAmount = booking.paymentSplit?.agroTourismAmount || Math.round(booking.totalAmount * 0.6);
                      return (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.name}</TableCell>
                          <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{booking.visitDate}</TableCell>
                          <TableCell>₹{booking.totalAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <AgricultureIcon sx={{ fontSize: 16, color: 'success.main' }} />
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                ₹{agroAmount.toLocaleString()}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label="CONFIRMED" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          )}

          {/* Baliraja Fun & Water Park Tab */}
          {tabValue === 4 && (
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Baliraja Fun & Water Park Revenue & Bookings</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Revenue from 40% payment split of all water park bookings
              </Typography>
              
              {/* Water Park Revenue Stats with GST */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3, mb: 4 }}>
                <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <MoneyIcon sx={{ fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6">Base Revenue (40%)</Typography>
                        <Typography variant="h4">
                          ₹{websiteBookings.reduce((sum, booking) => {
                            const waterparkAmount = booking.paymentSplit?.funWaterparkAmount || Math.round(booking.totalAmount * 0.4);
                            return booking.status === 'confirmed' ? sum + waterparkAmount : sum;
                          }, 0).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">Before GST</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <BusinessIcon sx={{ fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6">GST Collected (18%)</Typography>
                        <Typography variant="h4">
                          ₹{websiteBookings.reduce((sum, booking) => {
                            const waterparkAmount = booking.paymentSplit?.funWaterparkAmount || Math.round(booking.totalAmount * 0.4);
                            const gstAmount = Math.round(waterparkAmount * 0.18);
                            return booking.status === 'confirmed' ? sum + gstAmount : sum;
                          }, 0).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">18% GST on Water Park</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PoolIcon sx={{ fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6">Total with GST</Typography>
                        <Typography variant="h4">
                          ₹{websiteBookings.reduce((sum, booking) => {
                            const waterparkAmount = booking.paymentSplit?.funWaterparkAmount || Math.round(booking.totalAmount * 0.4);
                            const gstAmount = Math.round(waterparkAmount * 0.18);
                            const totalWithGst = waterparkAmount + gstAmount;
                            return booking.status === 'confirmed' ? sum + totalWithGst : sum;
                          }, 0).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">40% + 18% GST</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">Total Bookings</Typography>
                    <Typography variant="h5">{websiteBookings.filter(b => b.status === 'confirmed').length}</Typography>
                    <Typography variant="body2" color="primary.main">Confirmed bookings</Typography>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">This Month Revenue</Typography>
                    <Typography variant="h5">
                      ₹{websiteBookings
                        .filter(b => b.status === 'confirmed' && b.createdAt.startsWith(new Date().toISOString().slice(0, 7)))
                        .reduce((sum, booking) => {
                          const waterparkAmount = booking.paymentSplit?.funWaterparkAmount || Math.round(booking.totalAmount * 0.4);
                          return sum + waterparkAmount;
                        }, 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="primary.main">40% share</Typography>
                  </CardContent>
                </Card>
              </Box>
              
              <Typography variant="h6" sx={{ mb: 2 }}>Fun & Water Park Revenue Breakdown with GST</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Booking Date</TableCell>
                      <TableCell>Visit Date</TableCell>
                      <TableCell>Total Amount</TableCell>
                      <TableCell>Base (40%)</TableCell>
                      <TableCell>GST (18%)</TableCell>
                      <TableCell>Total with GST</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {websiteBookings.filter(booking => booking.status === 'confirmed').map((booking) => {
                      const waterparkAmount = booking.paymentSplit?.funWaterparkAmount || Math.round(booking.totalAmount * 0.4);
                      const gstAmount = Math.round(waterparkAmount * 0.18);
                      const totalWithGst = waterparkAmount + gstAmount;
                      
                      return (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.name}</TableCell>
                          <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{booking.visitDate}</TableCell>
                          <TableCell>₹{booking.totalAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <MoneyIcon sx={{ fontSize: 16, color: 'success.main' }} />
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                ₹{waterparkAmount.toLocaleString()}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <BusinessIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                                ₹{gstAmount.toLocaleString()}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <PoolIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                ₹{totalWithGst.toLocaleString()}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label="CONFIRMED" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          )}

          {/* Baliraja Total Business Tab */}
          {tabValue === 5 && (
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Baliraja Total Business Overview</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Complete business overview including all revenue streams, analytics, and performance metrics.
              </Typography>
              
              {/* Dynamic Business Overview Cards */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3, mb: 4 }}>
                <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <AgricultureIcon sx={{ fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6">Agro Tourism (60%)</Typography>
                        <Typography variant="h4">
                          ₹{websiteBookings.reduce((sum, booking) => {
                            const agroAmount = booking.paymentSplit?.agroTourismAmount || Math.round(booking.totalAmount * 0.6);
                            return booking.status === 'confirmed' ? sum + agroAmount : sum;
                          }, 0).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">Total Revenue</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PoolIcon sx={{ fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6">Water Park (40%)</Typography>
                        <Typography variant="h4">
                          ₹{websiteBookings.reduce((sum, booking) => {
                            const waterparkAmount = booking.paymentSplit?.funWaterparkAmount || Math.round(booking.totalAmount * 0.4);
                            return booking.status === 'confirmed' ? sum + waterparkAmount : sum;
                          }, 0).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">Total Revenue</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <BusinessIcon sx={{ fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6">Total Business</Typography>
                        <Typography variant="h4">
                          ₹{websiteBookings.reduce((sum, booking) => {
                            return booking.status === 'confirmed' ? sum + booking.totalAmount : sum;
                          }, 0).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">Combined Revenue</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              
              <Typography variant="h6" sx={{ mb: 2 }}>Dynamic Business Performance Metrics</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mb: 3 }}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">Total Bookings</Typography>
                    <Typography variant="h5">{websiteBookings.filter(b => b.status === 'confirmed').length}</Typography>
                    <Typography variant="body2" color="success.main">Confirmed bookings</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">Pending Bookings</Typography>
                    <Typography variant="h5">{websiteBookings.filter(b => b.status === 'pending').length}</Typography>
                    <Typography variant="body2" color="warning.main">Awaiting payment</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">This Month Revenue</Typography>
                    <Typography variant="h5">
                      ₹{websiteBookings
                        .filter(b => b.status === 'confirmed' && b.createdAt.startsWith(new Date().toISOString().slice(0, 7)))
                        .reduce((sum, booking) => sum + booking.totalAmount, 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="success.main">Current month</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">Average Booking Value</Typography>
                    <Typography variant="h5">
                      ₹{websiteBookings.filter(b => b.status === 'confirmed').length > 0 
                        ? Math.round(websiteBookings.reduce((sum, booking) => {
                            return booking.status === 'confirmed' ? sum + booking.totalAmount : sum;
                          }, 0) / websiteBookings.filter(b => b.status === 'confirmed').length).toLocaleString()
                        : '0'}
                    </Typography>
                    <Typography variant="body2" color="info.main">Per booking</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">Active Packages</Typography>
                    <Typography variant="h5">{websitePackages.length}</Typography>
                    <Typography variant="body2" color="info.main">Available packages</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">Total Guests</Typography>
                    <Typography variant="h5">
                      {websiteBookings.filter(b => b.status === 'confirmed').reduce((sum, booking) => sum + booking.adults + booking.children, 0)}
                    </Typography>
                    <Typography variant="body2" color="success.main">Adults + Children</Typography>
                  </CardContent>
                </Card>
              </Box>
              
              <Typography variant="h6" sx={{ mb: 2 }}>All Business Packages</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 3 }}>
                {websitePackages.map((pkg) => (
                  <Card key={pkg.id} sx={{ border: pkg.popular ? '2px solid' : '1px solid', borderColor: pkg.popular ? 'primary.main' : 'divider' }}>
                    {pkg.popular && (
                      <Box sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center', py: 1 }}>
                        <Typography variant="body2" fontWeight="bold">MOST POPULAR</Typography>
                      </Box>
                    )}
                    <CardContent>
                      <Typography variant="h5" gutterBottom>{pkg.name}</Typography>
                      <Typography variant="h3" color="primary.main" gutterBottom>
                        ₹{pkg.price.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        per {pkg.unit}
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="subtitle2" gutterBottom>Features:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {pkg.features.map((feature, index) => (
                          <Chip 
                            key={index} 
                            label={feature} 
                            size="small" 
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          )}

        </Card>
      </Container>

      {/* Package Dialog */}
      <Dialog open={openPackageDialog} onClose={() => setOpenPackageDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPackage ? 'Edit Package' : 'Add New Package'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Package Name"
            fullWidth
            variant="outlined"
            value={packageForm.name}
            onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={packageForm.description}
            onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Price (₹)"
            type="number"
            fullWidth
            variant="outlined"
            value={packageForm.price}
            onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Duration"
            fullWidth
            variant="outlined"
            value={packageForm.duration}
            onChange={(e) => setPackageForm({ ...packageForm, duration: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Facilities"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={packageForm.facilities}
            onChange={(e) => setPackageForm({ ...packageForm, facilities: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            variant="outlined"
            value={packageForm.image_url}
            onChange={(e) => setPackageForm({ ...packageForm, image_url: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPackageDialog(false)}>Cancel</Button>
          <Button onClick={handlePackageSubmit} variant="contained">
            {editingPackage ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;

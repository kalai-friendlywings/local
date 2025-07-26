import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import ShopCard from "../components/ShopCard";
import "../pages/Shops.css"; // Custom styles

const sampleShops = [
  {
    id: 1,
    name: "Trendy Threads",
    category: "Fashion",
    location: "Chennai",
    tags: ["Fashion"],
    createdAt: "2024-07-01",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Spicy Bites",
    category: "Food",
    location: "Madurai",
    tags: ["Food"],
    createdAt: "2024-06-15",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Gadget Galaxy",
    category: "Electronics",
    location: "Bangalore",
    tags: ["Electronics"],
    createdAt: "2024-05-10",
    rating: 4.7,
  },
];

const allTags = ["Fashion", "Food", "Electronics", "Handmade", "Books"];

export default function Shops() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [activeTags, setActiveTags] = useState([]);
  const [sortDialogOpen, setSortDialogOpen] = useState(false);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredShops = sampleShops.filter((shop) => {
    const matchesSearch = shop.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation =
      locationFilter === "" ||
      shop.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesTags =
      activeTags.length === 0 ||
      activeTags.every((tag) => shop.tags.includes(tag));
    return matchesSearch && matchesLocation && matchesTags;
  });

  const sortedShops = [...filteredShops].sort((a, b) => {
    switch (sortBy) {
      case "new":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "top":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <Box px={{ xs: 2, sm: 4, md: 6 }} py={{ xs: 3, sm: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Explore Shops
      </Typography>

      <Box mb={2}>
        <TextField
          label="Enter your location"
          variant="outlined"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          fullWidth
          size="small"
        />
      </Box>

      <Box
        display="flex"
        gap={2}
        mb={2}
        alignItems="center"
        flexWrap={{ xs: "wrap", sm: "nowrap" }}
      >
        <TextField
          label="Search shops"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />

        <IconButton
          onClick={() => setSortDialogOpen(true)}
          color="primary"
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            height: 40,
            width: 40,
            flexShrink: 0,
          }}
        >
          <SortIcon />
        </IconButton>
      </Box>

      {/* Tag Filter */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 1,
          mb: 3,
          pb: 1,
        }}
      >
        {allTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => toggleTag(tag)}
            color={activeTags.includes(tag) ? "primary" : "default"}
            clickable
          />
        ))}
      </Box>

      {/* Shop Cards */}
      <div className="shops-wrapper">
        {sortedShops.length > 0 ? (
          sortedShops.map((shop) => (
            <div className="shop-card-wrapper" key={shop.id}>
              <ShopCard shop={shop} />
            </div>
          ))
        ) : (
          <Typography align="center" color="text.secondary">
            No shops match your filters.
          </Typography>
        )}
      </div>

      {/* Sort Dialog */}
      <Dialog
        open={sortDialogOpen}
        onClose={() => setSortDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Sort By</DialogTitle>
        <List>
          {["featured", "new", "top"].map((option) => (
            <ListItem key={option} disablePadding>
              <ListItemButton
                selected={sortBy === option}
                onClick={() => {
                  setSortBy(option);
                  setSortDialogOpen(false);
                }}
              >
                <ListItemText
                  primary={
                    option === "featured"
                      ? "Featured"
                      : option === "new"
                      ? "Newest"
                      : "Top Rated"
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Box>
  );
}

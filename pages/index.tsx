import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { pages } from 'lib/pages'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <Container>
      <Typography variant="h2" sx={{ my: 4 }}>
        Notion Extensions
      </Typography>
      <Grid container spacing={2}>
        {pages.map((page, i) => (
          <Grid item key={i}>
            <Box
              component={Link}
              href={page.path}
              sx={{ textDecoration: 'none' }}
            >
              <Card variant="outlined" sx={{ width: 300 }}>
                <CardActionArea
                  sx={{
                    '& > img': {
                      margin: 2,
                      marginBottom: 0,
                    },
                  }}
                >
                  <CardMedia sx={{ '& > img': { objectFit: 'cover' } }}>
                    <Image
                      src={page.thumbnail_path}
                      alt={page.title}
                      width={300}
                      height={140}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h5" sx={{ opacity: 0.8 }}>
                      {page.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {page.subtitle}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

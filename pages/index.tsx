import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
  Grid,
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
              <Card variant="outlined">
                <CardActionArea
                  sx={{
                    '& > img': {
                      margin: 2,
                      marginBottom: 0,
                    },
                  }}
                >
                  <Image
                    src={page.thumbnail_path}
                    width={100}
                    height={100}
                    alt={page.title}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                      {page.title}
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

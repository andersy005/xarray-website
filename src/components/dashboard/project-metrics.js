import { DatasetteStatsCard } from '@/components/dashboard/datasette-stats-card'
import { StatisticsCard } from '@/components/dashboard/statistics-card'
import { Heading } from '@/components/mdx'
import { fetcher } from '@/lib/data-fetching'
import { SimpleGrid, Spinner, Box, Container } from '@chakra-ui/react'
import { BsPeople, BsPerson } from 'react-icons/bs'
import { GoBook, GoPackage, GoStar, GoTag } from 'react-icons/go'
import useSWR from 'swr'

export const ProjectMetrics = () => {
  const { data, error } = useSWR(
    'https://raw.githubusercontent.com/andersy005/pydata-issue-tracker-datasette/main/data/docs-monthly-views.json',
    fetcher,
  )

  if (error) return <div>failed to load data</div>
  if (!data)
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    )

  const monthlyViews = data.sort((a, b) => new Date(b.end) - new Date(a.end))[0]

  const dateObj = new Date(monthlyViews.end)
  const month = dateObj.toLocaleString('default', { month: 'short' })
  const year = dateObj.getFullYear()

  return (
    <Box as='section'>
      <Container maxW='container.xl'>
        {' '}
        <Heading as='h1' size='2xl' textAlign={'center'}>
          Xarray Project Metrics
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatisticsCard
            title={'Core Maintainers'}
            stat={'15'}
            icon={<BsPerson size={'3em'} />}
            link={'https://docs.xarray.dev/en/stable/team.html'}
          />
          <DatasetteStatsCard
            title={'Contributors'}
            query={
              'https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/contributors,user_id.json?_shape=array'
            }
            icon={<BsPeople size={'3em'} />}
            link={'https://github.com/pydata/xarray/graphs/contributors'}
          />

          <DatasetteStatsCard
            title={'Stargazers'}
            icon={<GoStar size={'3em'} />}
            query={
              'https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/stars,user.json?_shape=array'
            }
            link={'https://github.com/pydata/xarray/stargazers'}
          />

          <DatasetteStatsCard
            title={'Dependent Projects'}
            query={
              'https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/dependents,dependent.json?_shape=array'
            }
            icon={<GoPackage size={'3em'} />}
            link={'https://github.com/pydata/xarray/network/dependents'}
          />

          <StatisticsCard
            title={`${month}/${year} Docs Visitors`}
            stat={monthlyViews.users}
            icon={<GoBook size={'3em'} />}
          />

          <DatasetteStatsCard
            title={'Releases'}
            query={
              'https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/releases,id.json?_shape=array'
            }
            icon={<GoTag size={'3em'} />}
            link={'https://github.com/pydata/xarray/releases'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  )
}

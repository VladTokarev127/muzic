<template>
  <div class="home">
    <main>
      <div class="container">
        <ThePageTitle>Рецензии</ThePageTitle>

        <ul class="review-cards">
          <review-card
            v-for="file in musicFiles"
            :key="file.title"
            :music-file="file"></review-card>
        </ul>

        <div class="reviewed-tracks">
          <h2>Уже оценены</h2>
          <ul class="reviewed-cards">
            <reviewed-card
              v-for="file in musicFiles"
              :key="file.title"
              :music-file="file"></reviewed-card>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import ReviewCard from '@/components/review/ReviewCard.vue';
  import ReviewedCard from '@/components/review/ReviewedCard.vue';

  const musicFiles = [
    {
      artist: 'DJ Dark & MD DJ',
      title: 'Erhu (Original Mix)',
      src: require('@/assets/mp3/Erhu.mp3'),
      artwork: require('@/assets/mp3/Erhu.png'),
      genres: ['deep house', 'dance', 'house'],
      demo: false,
      comments: [],
    },
    {
      artist: 'KVPV',
      title: 'Sunshine',
      src: require('@/assets/mp3/Sunshine.mp3'),
      artwork: require('@/assets/mp3/Sunshine.png'),
      genres: ['deep house', 'dance'],
      demo: true,
      comments: [
        'Песня начинается с интенсивных, зажигательных, запоминающихся гитарных риффов, смешанных с динамичными барабанными битами. Все это уже говорит слушателям о наступающем вайбе — жанр здесь можно было бы охарактеризовать как прогрессив-метал. Он резкий, живой, заводной, очень хорошо сбалансирован как в аранжировках, так и в композиции в целом.',
      ],
    },
  ];
</script>

<style lang="sass" scoped>
  .home
    background: $secondary-color
    padding-top: 155px
    padding-bottom: 216px
  .review-cards
    display: grid
    gap: 40px
    margin-top: 40px
  .reviewed-tracks
    display: grid
    grid-template-columns: 210px 1fr
    gap: 30px
    margin-top: 67px
  .reviewed-tracks h2
    font-size: $h2-font-size
    font-weight: $h2-font-weight
    line-height: $h2-line-heigth
    letter-spacing: $letter-spacing
    color: $title-color
  .reviewed-tracks .reviewed-cards
    display: grid
    gap: 30px
</style>

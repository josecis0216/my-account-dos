<template>
    <section class="overview-section logs">
        <div class="title-block">
            <h3>Text/SMS</h3>
        </div>
        <p v-if="!hasLogs">Coming Soon!</p>
        <div class="flex logs-table" v-if="hasLogs">
            <table>
              <thead>
                <tr>
                  <th>
                    Sent/Received
                  </th>
                  <th>
                    Date
                  </th>
                  <th>
                    Time
                  </th>
                  <th>
                    Destination
                  </th>
                  <th>
                    To/From
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in rows" :key="row.date">
                  <td>{{row.status}}</td>
                  <td>{{row.date}}</td>
                  <td>{{row.time}}</td>
                  <td>{{row.destination}}</td>
                  <td>{{row.recpient}}</td>
                </tr>
              </tbody>
            </table>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import LogsOverview from "../components/Logs/LogsOverview";
export default {
  name: 'TextLog',
  data() {
    return {
      hasLogs: false,
      rows: [
        {
          status: 'Received',
          date: '1/21/2020',
          duration: '01:02',
          time: '06:34',
          destination: 'Riverton',
          recpient: '667-328-8705',
        },
        {
          status: 'Received',
          date: '1/20/2020',
          duration: '01:02',
          time: '06:34',
          destination: 'Riverton',
          recpient: '667-328-8705',
        },
        {
          status: 'Sent',
          date: '1/19/2020',
          duration: '00:39',
          time: '02:34',
          destination: 'Riverton',
          recpient: '667-328-8705',
        },
        {
          status: 'Received',
          date: '1/16/2020',
          duration: '01:02',
          time: '16:34',
          destination: 'Riverton',
          recpient: '667-328-8705',
        },
        {
          status: 'Received',
          date: '1/15/2020',
          duration: '01:02',
          time: '06:20',
          destination: 'Riverton',
          recpient: '667-328-8705',
        },
        {
          status: 'Sent',
          date: '1/13/2020',
          duration: '00:52',
          time: '03:14',
          destination: 'Riverton',
          recpient: '667-328-8705',
        },
        {
          status: 'Received',
          date: '1/11/2020',
          duration: '01:30',
          time: '10:57',
          destination: 'Riverton',
          recpient: '667-328-8705',
        }
      ],
    };
  },
  components: {
    // LogsOverview
  }
}
</script>

<style lang="less" scoped>
</style>
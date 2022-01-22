<template>
    <section class="overview-section logs">
        <div class="title-block">
            <h3>Call Logs</h3>
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
                    Duration
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
                  <td>{{row.duration}}</td>
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
  name: 'PhoneLog',
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

<style lang="less">
  .logs {
    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #E5E5E5;
      border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #8E8E8E; 
      border-radius: 10px;
    }
    .logs-table {
      display: block;
      overflow: auto;
      max-height: 300px;
      table {
        border-collapse: collapse;
        width: 100%;
        thead {
          tr {
            th {
              color: #313638;
              padding: 10px 0;
              text-align: left;
              font-weight: 600;
              font-family: 'gotham';
            }
          }
        }
        tbody tr {
          border-bottom: 6px solid #ffffff;
          td {
            color: #313638;
            padding: 10px 0;
            &:first-child {
              padding-left: 20px;
              border-radius: 10px 0 0px 10px;
            }
            &:last-child {
              text-align: left;
              padding-right: 20px;
              border-radius: 0 10px 10px 0;
            }
          }
          &:nth-child(odd) {
            background: #F5F5F5;
          }
        }
      }
    }
  }
</style>
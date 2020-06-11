package com.wegatravel.partnermanager.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.wegatravel.partnermanager.web.rest.TestUtil;

public class AgenceVoyageTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgenceVoyage.class);
        AgenceVoyage agenceVoyage1 = new AgenceVoyage();
        agenceVoyage1.setId(1L);
        AgenceVoyage agenceVoyage2 = new AgenceVoyage();
        agenceVoyage2.setId(agenceVoyage1.getId());
        assertThat(agenceVoyage1).isEqualTo(agenceVoyage2);
        agenceVoyage2.setId(2L);
        assertThat(agenceVoyage1).isNotEqualTo(agenceVoyage2);
        agenceVoyage1.setId(null);
        assertThat(agenceVoyage1).isNotEqualTo(agenceVoyage2);
    }
}
